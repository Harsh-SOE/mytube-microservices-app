import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get KAFKA_SERVICE_PORT() {
    return this.configService.getOrThrow<number>('KAFKA_SERVICE_PORT');
  }

  get HTTP_PORT() {
    return this.configService.getOrThrow<number>('HTTP_PORT');
  }

  get KAFKA_SERVICE_HOST() {
    return this.configService.getOrThrow<number>('KAFKA_SERVICE_HOST');
  }

  get AGGREGATOR_CLIENT_ID() {
    return this.configService.getOrThrow<string>('AGGREGATOR_CLIENT_ID');
  }

  get AGGREGATOR_CONSUMER_ID() {
    return this.configService.getOrThrow<string>('AGGREGATOR_CONSUMER_ID');
  }

  get DATABASE_URL() {
    return this.configService.getOrThrow<string>('DATABASE_URL');
  }

  get CLIENT_OPTIONS(): KafkaOptions {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: this.AGGREGATOR_CLIENT_ID,
          brokers: [`${this.KAFKA_SERVICE_HOST}:${this.KAFKA_SERVICE_PORT}`],
        },
        consumer: { groupId: this.AGGREGATOR_CONSUMER_ID },
      },
    };
  }

  get GRAFANA_LOKI_URL() {
    return this.configService.getOrThrow<string>('GRAFANA_LOKI_URL');
  }

  get CACHE_HOST() {
    return this.configService.getOrThrow<string>('CACHE_HOST');
  }

  get CACHE_PORT() {
    return this.configService.getOrThrow<number>('CACHE_PORT');
  }

  get CACHE_STREAM_KEY() {
    return this.configService.getOrThrow<string>('CACHE_STREAM_KEY');
  }

  get CACHE_STREAM_GROUP_NAME() {
    return this.configService.getOrThrow<string>('CACHE_STREAM_GROUP_NAME');
  }
}
