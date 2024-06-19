import { Module } from '@nestjs/common';
import { ListenerService } from './services/listener.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LastSignature } from './entities/last-signature.entity';
import { Listener } from './listener';
import { LastSignatureService } from './services/last-signature.service';
import { PortfolioModule } from 'src/portfolio/portfolio.module';
import { ProjectModule } from 'src/project/project.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([LastSignature]),
    PortfolioModule,
    ProjectModule,
  ],
  providers: [ListenerService, Listener, LastSignatureService],
})
export class ListenerModule {}
