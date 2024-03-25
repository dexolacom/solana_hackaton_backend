import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  Connection,
  PublicKey,
  Keypair,
  Transaction,
  SystemProgram,
  sendAndConfirmTransaction,
} from '@solana/web3.js';

@Injectable()
export class SolanaWeb3Service {
  private logger = new Logger(SolanaWeb3Service.name);
  connection: Connection;
  adminKeypair: Keypair;

  constructor(private readonly config: ConfigService) {
    const { rpcUrl, adminPrivateKey } = this.config.get('config');
    this.connection = new Connection(rpcUrl, 'confirmed');
    this.adminKeypair = Keypair.fromSecretKey(
      new Uint8Array(JSON.parse(adminPrivateKey)),
    );
  }

  async getBalance(address: string): Promise<number> {
    try {
      const publicKey = new PublicKey(address);
      const balance = await this.connection.getBalance(publicKey);
      return balance / 10 ** 9; // Convert lamports to SOL
    } catch (error) {
      this.logger.error('getBalance error:', error.message);
      return 0;
    }
  }

  async sendTransaction(transaction: Transaction): Promise<string> {
    try {
      const signature = await this.connection.sendTransaction(transaction, [
        this.adminKeypair,
      ]);
      return signature;
    } catch (error) {
      this.logger.error('sendTransaction error:', error.message);
      throw error;
    }
  }

  async createAndFundAccount(): Promise<string> {
    try {
      const newAccount = Keypair.generate();
      const transaction = new Transaction().add(
        SystemProgram.createAccount({
          fromPubkey: this.adminKeypair.publicKey,
          newAccountPubkey: newAccount.publicKey,
          lamports: 10 ** 9, // 1 SOL
          space: 0,
          programId: SystemProgram.programId,
        }),
      );
      await this.sendTransaction(transaction);
      return newAccount.publicKey.toBase58();
    } catch (error) {
      this.logger.error('createAndFundAccount error:', error.message);
      throw error;
    }
  }

  async sendSol(
    fromPrivateKey: Uint8Array,
    toAddress: string,
    amount: number,
  ): Promise<string> {
    try {
      const fromKeypair = Keypair.fromSecretKey(fromPrivateKey);
      const toPublicKey = new PublicKey(toAddress);
      const lamports = amount * 10 ** 9; // Преобразуем SOL в lamports

      const transaction = new Transaction().add(
        SystemProgram.transfer({
          fromPubkey: fromKeypair.publicKey,
          toPubkey: toPublicKey,
          lamports, // Количество lamports для отправки
        }),
      );

      // Получаем последний блокхеш и информацию о комиссиях
      const { blockhash, feeCalculator } =
        await this.connection.getLatestBlockhash();

      // Указываем плательщика комиссии
      transaction.feePayer = fromKeypair.publicKey;
      transaction.recentBlockhash = blockhash;

      // Подписываем транзакцию
      transaction.partialSign(fromKeypair);

      // Отправляем транзакцию
      const signature = await sendAndConfirmTransaction(
        this.connection,
        transaction,
        [fromKeypair],
      );

      return signature;
    } catch (error) {
      this.logger.error('sendSol error:', error.message);
      throw error;
    }
  }
}
