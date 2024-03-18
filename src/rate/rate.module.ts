import { Module } from '@nestjs/common';
import { RateService } from './rate.service';

@Module({
  providers: [RateService],
  exports: [RateService],
})
export class RateModule {}
