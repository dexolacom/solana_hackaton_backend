import { Module } from '@nestjs/common';
import { SolanaWeb3Service } from './solana-web3.service';

@Module({
  providers: [SolanaWeb3Service],
  exports: [SolanaWeb3Service],
})
export class SolanaWeb3Module {}
