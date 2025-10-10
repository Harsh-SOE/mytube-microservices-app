import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import {
  HealthIndicatorResult,
  HealthIndicatorService,
} from '@nestjs/terminus';
import { Admin, Kafka, logLevel } from 'kafkajs';

import { AppConfigService } from '../config/config.service';

@Injectable()
export class AppHealthService implements OnModuleInit, OnModuleDestroy {
  private kafka: Kafka;
  private admin: Admin;

  constructor(
    private readonly healthIndicator: HealthIndicatorService,
    private readonly configService: AppConfigService,
  ) {
    this.kafka = new Kafka({
      brokers: [
        `${configService.KAFKA_SERVICE_HOST}:${configService.KAFKA_SERVICE_PORT}`,
      ],
      clientId: this.configService.COMMENTS_AGGREGATOR_CLIENT_ID,
      logLevel: logLevel.WARN,
    });
    this.admin = this.kafka.admin();
  }

  async onModuleDestroy() {
    await this.admin.connect();
  }

  async onModuleInit() {
    await this.admin.disconnect();
  }

  async isHealthy(key: string): Promise<HealthIndicatorResult> {
    const indicator = this.healthIndicator.check(key);
    try {
      const topics = await this.admin.listTopics();
      return indicator.up({ health: 'OK', topics: topics });
    } catch (error) {
      console.error(error);
      return indicator.down({ health: 'UNHEALTHY', topics: [] });
    }
  }
}
