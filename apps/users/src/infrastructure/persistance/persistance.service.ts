import {
  Injectable,
  Logger,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';

import { Prisma, PrismaClient } from '@peristance/user';

@Injectable()
export class PersistanceService
  extends PrismaClient<
    Prisma.PrismaClientOptions,
    'query' | 'info' | 'warn' | 'error'
  >
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
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
      Logger.log('--- MongoDB Query ---');
      Logger.log(`Operation: ${e.query}`);
      Logger.log(`Params: ${e.params}`);
      Logger.log(`Duration: ${e.duration}ms`);
    });

    await this.$connect();
    console.log('Successfully connected to the database.');
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log('Successfully disconnected from the database.');
  }

  async cleanDB() {
    await this.user.deleteMany();
  }
}
