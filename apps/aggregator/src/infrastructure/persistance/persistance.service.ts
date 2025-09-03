import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'apps/aggregator/generated/prisma';

@Injectable()
export class PersistanceService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    console.log(`Database connected successfully`);
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log(`Database disconnected successfully`);
  }
}
