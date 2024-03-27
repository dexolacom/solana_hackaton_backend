import { Module } from '@nestjs/common';
import { ProjectService } from './project.service';
import { ProjectController } from './project.controller';
import { Project } from './entities/project.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectToken } from './entities/projectToken.entity';
import { TokenModule } from 'src/token/token.module';
import { RateModule } from 'src/rate/rate.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
  imports: [
    TypeOrmModule.forFeature([Project, ProjectToken]),
    TokenModule,
    RateModule,
    CacheModule.register(),
  ],
  controllers: [ProjectController],
  providers: [ProjectService],
  exports: [ProjectService],
})
export class ProjectModule {}
