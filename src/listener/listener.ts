import { Injectable, OnApplicationBootstrap, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PROGRAMS } from 'src/common/programs';
import { ListenerService } from './services/listener.service';

@Injectable()
export class Listener implements OnApplicationBootstrap {
  private logger = new Logger(Listener.name);
  constructor(
    private readonly config: ConfigService,
    private readonly listenerService: ListenerService,
  ) {}
  onApplicationBootstrap() {
    this.start();
  }
  async start(): Promise<void> {
    const subscriptionDelay = this.config.get('SUBSCRIPTION_DELAY') || 5000;
    while (true) {
      try {
        await this.checkTransactions();
      } catch (error) {
        this.logger.error('There was an error during whitelist check:', error);
      } finally {
        await this.sleep(subscriptionDelay);
      }
    }
  }

  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  private async checkTransactions() {
    this.logger.log('checkTransactions');
    try {
      for (const program of PROGRAMS) {
        await this.listenerService.checkEvents(program.address);
      }
      return;
    } catch (error) {
      return new Error(error);
    }
  }
}
