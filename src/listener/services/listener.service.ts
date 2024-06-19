import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import {
  clusterApiUrl,
  ConfirmedSignatureInfo,
  Connection,
  ParsedTransactionWithMeta,
  PartiallyDecodedInstruction,
  PublicKey,
} from '@solana/web3.js';

import { BorshCoder, Idl } from '@project-serum/anchor';
import { IDL } from 'src/common/idl/idl';
import { LastSignatureService } from './last-signature.service';
import { PortfolioService } from 'src/portfolio/portfolio.service';
import { ProjectService } from 'src/project/project.service';
import { EStatus } from 'src/@enums';
import { tokensWithKey } from 'src/common/tokens';
import { getAssociatedTokenAddressSync } from '@solana/spl-token';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ListenerService implements OnModuleInit {
  private readonly logger = new Logger(ListenerService.name);
  private connection: Connection;
  private readonly coder: BorshCoder = new BorshCoder(IDL as Idl);

  constructor(
    private readonly config: ConfigService,
    private readonly lastSignatureService: LastSignatureService,
    private readonly portfolioService: PortfolioService,
    private readonly projectService: ProjectService,
  ) {}

  onModuleInit() {
    this.initializeConnection();
  }

  private initializeConnection() {
    // Connect to the Solana devnet
    console.log('initializeConnection', this.config.get('SOLANA_RPC_URL'));
    this.connection = new Connection(
      this.config.get('SOLANA_RPC_URL'),
      'confirmed',
    );
    this.logger.log('Connected to Solana devnet');
  }

  async getSignaturesWithBackoff(
    programPubkey,
    lastSignature,
    limit,
    maxRetries = 10,
  ) {
    let retries = 0;
    let delay = 5000; // Initial delay in milliseconds

    while (retries < maxRetries) {
      try {
        console.log('getSignaturesWithBackoff');
        const response = await this.connection.getSignaturesForAddress(
          programPubkey,
          {
            until: lastSignature,
            limit: limit,
          },
        );
        return response; // If request is successful, return the response
      } catch (error) {
        if (error.response && error.response.status === 429) {
          // 429 Too Many Requests
          console.log(
            `Server responded with 429 Too Many Requests. Retrying after ${delay}ms delay...`,
          );
          await this.delay(delay);
          delay *= 2; // Exponential backoff
          retries++;
        } else {
          // Handle other errors
          throw error;
        }
      }
    }
    throw new Error('Max retries reached');
  }

  async checkEvents(address: string): Promise<void> {
    const programPubkey = new PublicKey(address);
    console.log('checkEvents');
    try {
      const lastSignature = await this.getLastSignature(address);

      console.log('lastSignature', lastSignature);
      const signatures: Array<ConfirmedSignatureInfo> =
        // await this.connection.getSignaturesForAddress(programPubkey, {
        //   until: lastSignature,
        //   limit: 1000,
        // });
        await this.getSignaturesWithBackoff(
          programPubkey,
          lastSignature,
          1000,
          7,
        );

      console.log('signatures');
      await this.processSignatures(
        signatures.reverse(),
        programPubkey,
        address,
      );
    } catch (error) {
      this.logger.error(error);
    }
  }

  private async processSignatures(
    signatures: Array<ConfirmedSignatureInfo>,
    programPubkey: PublicKey,
    program: string,
  ): Promise<void> {
    console.log('processSignatures', signatures);

    console.log('signatures');
    for (const signatureInfo of signatures) {
      const transaction = await this.getParsedTransactionWithRetry(
        signatureInfo.signature,
      );
      const instructions = transaction?.transaction.message
        .instructions as PartiallyDecodedInstruction[];

      if (transaction.meta.err) {
        this.logger.error(
          `Transaction with error, skip ${signatureInfo.signature}: ${transaction.meta.err}`,
        );
        await this.setLastSignature(
          program,
          signatureInfo.signature,
          signatureInfo.slot,
        );
        continue;
      }

      try {
        if (transaction && instructions.length > 0) {
          const signer = transaction.transaction.message.accountKeys[0].pubkey;

          await this.processInstructions(instructions, programPubkey, signer);
        }

        // Update the last signature
        await this.setLastSignature(
          program,
          signatureInfo.signature,
          signatureInfo.slot,
        );
      } catch (error) {
        throw new Error(error);
      }
    }
  }

  async processInstructions(
    instructions: PartiallyDecodedInstruction[],
    programPubkey: PublicKey,
    signer: PublicKey,
  ): Promise<void> {
    for (const instruction of instructions) {
      if (instruction.programId.equals(programPubkey)) {
        const ix = this.coder.instruction.decode(
          instruction.data,
          'base58',
        ) as {
          data: {
            collectionId: number;
            portfolioId: number | undefined;
            amount: string;
          };
          name: string;
        };
        if (!ix) throw new Error('could not parse data');

        const collectionId = ix.data.collectionId;
        const portfolioId = ix.data.portfolioId;

        try {
          if (ix.name === 'receivePortfolio') {
            console.log('receivePortfolio', ix);

            const tokens =
              await this.projectService.getProjectTokensByCollection(
                collectionId,
              );

            const [collection] = PublicKey.findProgramAddressSync(
              [
                Buffer.from('collection'),
                programPubkey.toBuffer(),
                Buffer.from([collectionId]),
              ],
              programPubkey,
            );

            const [mint] = PublicKey.findProgramAddressSync(
              [
                Buffer.from('token'),
                collection.toBuffer(),
                Buffer.from([portfolioId]),
              ],
              programPubkey,
            );

            const addresses = tokens.map((item) => {
              return new PublicKey(
                tokensWithKey.find((token) => token.symbol === item)?.key,
              );
            });

            const balanceAddresses = this.getPortfolioTokenAccounts(
              mint,
              addresses,
            );

            const coinAmounts: {
              [key: string]: {
                amount: string;
                decimals: number;
                uiAmount: number;
              };
            } = {};
            for (let i = 0; i < balanceAddresses.length; i++) {
              const address = balanceAddresses[i];
              const symbol = tokens[i];

              console.log('symbol', symbol, address.toString());
              try {
                const balance = await this.connection.getTokenAccountBalance(
                  address,
                );
                coinAmounts[symbol] = {
                  ...balance.value,
                };
              } catch (error) {
                coinAmounts[symbol] = {
                  amount: '0',
                  decimals: 0,
                  uiAmount: 0,
                };
                this.logger.error(error);
              }
            }

            const data = {
              status: EStatus.RECEIVED,
              coinAmounts,
            };
            const portfolio = await this.portfolioService.update(
              collectionId,
              portfolioId,
              data,
            );
            console.log(portfolio);
          } else if (ix.name === 'buyPortfolio') {
            console.log('buyPortfolio');

            const tokens =
              await this.projectService.getProjectTokensByCollection(
                collectionId,
              );
            const project = await this.projectService.updateTotalAmount(
              collectionId,
              Number(ix.data.amount),
              true,
            );

            const coinAmounts: {
              [key: string]: {
                amount: string;
                decimals: number;
                uiAmount: number;
              };
            } = {};

            for (const token of tokens) {
              coinAmounts[token] = {
                amount: '0',
                decimals: 0,
                uiAmount: 0,
              };
            }
            const data = {
              portfolioId: portfolioId,
              amount: Number(ix.data.amount || 0),
              program: programPubkey.toString(),
              project,
              coinAmounts,
            };
            console.log('data', data);
            const portfolio = await this.portfolioService.create(data);

            console.log('buyPortfolio', portfolio);
          } else if (ix.name === 'burnPortfolio') {
            console.log('burnPortfolio');

            const data = {
              status: EStatus.BURNED,
              burner: signer.toString(),
            };
            const portfolio = await this.portfolioService.update(
              collectionId,
              portfolioId,
              data,
            );
            console.log('burnPortfolio', portfolio);
          } else if (ix.name === 'withdrawPortfolio') {
            console.log('withdrawPortfolio');
            const data = {
              status: EStatus.WITHDRAWN,
            };
            const portfolio = await this.portfolioService.update(
              collectionId,
              portfolioId,
              data,
            );
            console.log('withdrawPortfolio', portfolio);
          }
        } catch (error) {
          console.log('error' + ix.name, error);
          throw new Error(error);
        }
      }
    }
  }

  private async getParsedTransactionWithRetry(
    signature: string,
    retries: number = 5,
  ): Promise<ParsedTransactionWithMeta | null> {
    for (let i = 0; i < retries; i++) {
      try {
        return await this.connection.getParsedTransaction(signature, {
          maxSupportedTransactionVersion: 0,
        });
      } catch (error) {
        if (error.message.includes('Too Many Requests')) {
          const delayTime = Math.pow(2, i) * 1000;
          this.logger.warn(
            `Rate limit hit, retrying after ${delayTime / 1000} seconds...`,
          );
          await this.delay(delayTime);
        } else {
          throw error;
        }
      }
    }
    return null;
  }

  private async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async getLastSignature(program: string): Promise<string> {
    // return 'lastSignature';
    // const res = await this.lastSignatureService.findOne({ program });
    // return res?.signature;
    const signature = await this.lastSignatureService.findOrCreate(program, {
      program,
      signature: '',
      slot: 0,
    });
    return signature.length > 0 ? signature : null;
  }

  async setLastSignature(
    program: string,
    signature: string,
    slot: number,
  ): Promise<void> {
    console.log('setLastSignature');
    await this.lastSignatureService.update({ program, signature, slot });
  }

  getPortfolioTokenAccounts(
    portfolio: PublicKey,
    collection_tokens: PublicKey[],
  ) {
    const result = [];
    for (const token of collection_tokens) {
      result.push(getAssociatedTokenAddressSync(token, portfolio, true));
    }
    return result;
  }
}
