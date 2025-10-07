import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

import { PrismaClient, Prisma } from '@peristance/hub';

@Injectable()
export class PersistanceService
  extends PrismaClient<
    Prisma.PrismaClientOptions,
    'query' | 'info' | 'warn' | 'error'
  >
  implements OnModuleInit, OnModuleDestroy
{
  public constructor() {
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
    this.$on('query', (e) => {
      Logger.log('--- Database Query ---');
      Logger.log(`Operation: ${e.query}`);
      Logger.log(`Params: ${e.params}`);
      Logger.log(`Duration: ${e.duration}ms`);
    });

    await this.$connect();
    console.log(`Database connected successfully`);
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log(`Database disconnected successfully`);
  }
}
