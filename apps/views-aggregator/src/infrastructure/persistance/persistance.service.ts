import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@persistance/views-aggregator';

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
    console.log(`Connected to postgresql`);
  }

  async onModuleDestroy() {
    await this.$disconnect();
    console.log(`Disconnected from postgresql`);
  }
}
