import { Injectable, OnModuleInit } from '@nestjs/common';
import { OpenFgaClient } from '@openfga/sdk';

import { AppConfigService } from '../config/config.service';

@Injectable()
export class OpenfgaService implements OnModuleInit {
  private fgaClient: OpenFgaClient;
  constructor(private readonly appConfig: AppConfigService) {}

  onModuleInit() {
    this.fgaClient = new OpenFgaClient({
      apiUrl: this.appConfig.FGA_API_URL,
      storeId: this.appConfig.FGA_STORE_ID,
      authorizationModelId: this.appConfig.FGA_MODEL_ID,
    });
  }

  async check(user: string, relation: string, object: string) {
    const isAllowed = (await this.fgaClient.check({ object, relation, user }))
      .allowed;
    return isAllowed;
  }

  async createTuple(user: string, relation: string, object: string) {
    const createdTuple = await this.fgaClient.write({
      writes: [{ user, object, relation }],
    });
    return createdTuple;
  }

  async deletedTuple(user: string, relation: string, object: string) {
    const deletedTuple = await this.fgaClient.write({
      deletes: [{ user, object, relation }],
    });
    return deletedTuple;
  }
}
