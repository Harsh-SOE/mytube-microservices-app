import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import { PrismaClient } from '@peristance/user';

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
