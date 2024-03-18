import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppConfig, DatabaseConfig } from './config';
import { TokenModule } from './token/token.module';
import { ProjectModule } from './project/project.module';
import { RateModule } from './rate/rate.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [AppConfig, DatabaseConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) =>
        configService.get('typeorm'),
    }),
    TokenModule,
    ProjectModule,
    RateModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
