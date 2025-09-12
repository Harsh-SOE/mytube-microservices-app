import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from 'apps/watch/generated/prisma';

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
    console.log(`Connected to cockroach db`);
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log(`Disconnected from cockroach db`);
  }
}
