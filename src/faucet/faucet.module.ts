import { Module } from '@nestjs/common';
import { FaucetService } from './faucet.service';
import { FaucetController } from './faucet.controller';

@Module({
  providers: [FaucetService],
  controllers: [FaucetController]
})
export class FaucetModule {}
