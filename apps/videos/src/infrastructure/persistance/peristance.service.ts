import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@peristance/videos';

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
    console.log(`Connected to database`);
  }
  async onModuleDestroy() {
    await this.$disconnect();
    console.log(`Disconnected from database`);
  }
}
