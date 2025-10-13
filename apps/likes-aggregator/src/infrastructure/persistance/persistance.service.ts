import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import winston from 'winston';

import { Prisma, PrismaClient } from '@peristance/likes-aggregator';
import { WINSTON_LOGGER } from '@app/clients';

import { AppConfigService } from '@likes-aggregator/config';

@Injectable()
export class PersistanceService
  extends PrismaClient<
    Prisma.PrismaClientOptions,
    'query' | 'info' | 'warn' | 'error'
  >
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    private readonly configService: AppConfigService,
    @Inject(WINSTON_LOGGER) private logger: winston.Logger,
  ) {
    super({
      log: [
        {
          emit: 'event',
          level: 'query',
        },
        {
          emit: 'stdout',
          level: 'info',
        },
        {
          emit: 'stdout',
          level: 'warn',
        },
        {
          emit: 'stdout',
          level: 'error',
        },
      ],
    });
  }

  async onModuleInit() {
    console.log(`Prisma connecting to URL: ${this.configService.DATABASE_URL}`);

    this.$on('query', (e) => {
      this.logger.log('database', '--- MongoDB Query Info Begins ---');
      this.logger.log('database', `AGGREGATOR :: Operation: ${e.query}`);
      this.logger.log('database', `AGGREGATOR :: Params: ${e.params}`);
      this.logger.log('database', `AGGREGATOR :: Duration: ${e.duration}ms`);
      this.logger.log('database', '--- MongoDB Query Info Ends ---');
    });

    await this.$connect();
    console.log(`Database connected successfully`);
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log(`Database disconnected successfully`);
  }
}
