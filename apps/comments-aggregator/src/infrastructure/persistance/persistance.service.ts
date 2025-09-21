import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'apps/comments-aggregator/generated/prisma';

@Injectable()
export class PersistanceService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  public constructor() {
    super();
  }

  async onModuleInit() {
    await this.$connect();
    console.log(`Connected to comments database`);
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log(`Disconnected from comments database`);
  }
}
