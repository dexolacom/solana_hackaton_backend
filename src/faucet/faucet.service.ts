import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  createAssociatedTokenAccountInstruction,
  createMintToInstruction,
  getAssociatedTokenAddressSync,
} from '@solana/spl-token';
import {
  TransactionInstruction,
  TransactionMessage,
  VersionedTransaction,
  AddressLookupTableAccount,
  Connection,
  Keypair,
  PublicKey,
  Signer,
} from '@solana/web3.js';

const USDC = new PublicKey('HxwDiYR6swJjW3hhAt4CCmq2qPxXGn29BCjaciXR6S3J');
@Injectable()
export class FaucetService {
  private wallet;
  private connection: Connection;

  constructor(private readonly config: ConfigService) {
    this.wallet = Keypair.fromSecretKey(
      Uint8Array.from(
        this.config.get('FAUCET_PRIVATE_KEY').split(',').map(Number),
      ),
    );
    this.connection = new Connection(
      this.config.get('SOLANA_RPC_URL'),
      'confirmed',
    );
  }
  // let wallet = Keypair.fromSeed(Uint8Array.from(priv.slice(0, 32)));

  async faucetTokens(recipientAddress: string) {
    const recipient = new PublicKey(recipientAddress);
    const ata = getAssociatedTokenAddressSync(USDC, recipient);

    let isCreatedAta = false;
    try {
      const ata_account = await this.connection.getAccountInfo(ata);
      if (ata_account) {
        isCreatedAta = true;
      }
    } catch (err) {
      console.error(err);
    }

    const result_instruction: TransactionInstruction[] = [];
    if (!isCreatedAta) {
      console.log(`Creating ATA for ${recipient.toString()}`);

      const instruction = createAssociatedTokenAccountInstruction(
        this.wallet.publicKey,
        ata,
        recipient,
        USDC,
      );

      result_instruction.push(instruction);
    }

    const mintToInstruction = createMintToInstruction(
      USDC,
      ata,
      this.wallet.publicKey,
      100_000_000,
    );
    result_instruction.push(mintToInstruction);
    console.log('Mint 100 USDC to: ' + recipient.toString());
    const res = await this.createAndSendV0Tx(
      this.connection,
      result_instruction,
      this.wallet,
    );
    console.log('Transaction: ' + res);

    return {
      amount: 100,
      message: 'Tokens sent successfully',
      transaction: res,
    };
  }

  async createAndSendV0Tx(
    connection: Connection,
    txInstructions: TransactionInstruction[],
    payer: Signer,
    addressLookupTable: PublicKey[] | undefined = undefined,
  ) {
    // Step 1 - Fetch the latest blockhash
    let latestBlockhash = await connection.getLatestBlockhash('confirmed');
    console.log(
      '   ✅ - Fetched latest blockhash. Last Valid Height:',
      latestBlockhash.lastValidBlockHeight,
    );

    // Step 2 - Generate Transaction Message
    let messageV0;
    if (addressLookupTable) {
      const result: AddressLookupTableAccount[] = [];
      for (const address of addressLookupTable) {
        const lookupTableAccount = (
          await connection.getAddressLookupTable(address)
        ).value;
        if (!lookupTableAccount)
          throw new Error('Address Lookup Table not found');
        result.push(lookupTableAccount);
      }

      messageV0 = new TransactionMessage({
        payerKey: payer.publicKey,
        recentBlockhash: latestBlockhash.blockhash,
        instructions: txInstructions,
      }).compileToV0Message(result);
    } else {
      messageV0 = new TransactionMessage({
        payerKey: payer.publicKey,
        recentBlockhash: latestBlockhash.blockhash,
        instructions: txInstructions,
      }).compileToV0Message();
    }

    console.log('   ✅ - Compiled Transaction Message');
    const transaction = new VersionedTransaction(messageV0);

    // Step 3 - Sign your transaction with the required `Signers`
    transaction.sign([payer]);
    console.log('   ✅ - Transaction Signed');

    // Step 4 - Send our v0 transaction to the cluster
    const txid = await connection
      .sendTransaction(transaction, {
        maxRetries: 5,
        skipPreflight: true,
      })
      .catch((err) => {
        console.error(err);
        if (err.logs) {
          err.logs.forEach((element) => {
            console.error(element);
          });
        }
        throw new Error(err);
      });
    console.log('   ✅ - Transaction sent to network');

    // Step 5 - Confirm Transaction
    const confirmation = await connection.confirmTransaction(
      {
        signature: txid,
        blockhash: latestBlockhash.blockhash,
        lastValidBlockHeight: latestBlockhash.lastValidBlockHeight,
      },
      'confirmed',
    );

    if (confirmation.value.err) {
      throw new Error(
        `   ❌ - Transaction not confirmed.\nReason: ${confirmation.value.err}`,
      );
    }

    console.log('🎉 Transaction Successfully Confirmed!');
    return txid;
  }
}
