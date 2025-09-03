/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { GrpcOptions, KafkaOptions, Transport } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

import { LIKE_PACKAGE_NAME } from '@app/contracts/likes';
import { GRPC_HEALTH_V1_PACKAGE_NAME } from '@app/contracts/health';
import { ReflectionService } from '@grpc/reflection';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get HTTP_PORT() {
    return this.configService.getOrThrow<number>('HTTP_PORT');
  }

  get SERVICE_PORT() {
    return this.configService.getOrThrow<number>('SERVICE_PORT');
  }

  get GRAFANA_LOKI_URL() {
    return this.configService.getOrThrow<string>('GRAFANA_LOKI_URL');
  }

  get MONGO_DB_USERNAME() {
    return this.configService.getOrThrow<string>('MONGO_DB_USERNAME');
  }

  get MONGO_DB_PASSWORD() {
    return this.configService.getOrThrow<string>('MONGO_DB_PASSWORD');
  }

  get MONGO_DB_NAME() {
    return this.configService.getOrThrow<string>('MONGO_DB_NAME');
  }

  get MONGO_DB_HOST() {
    return this.configService.getOrThrow<string>('MONGO_DB_HOST');
  }

  get MONGO_DB_PORT() {
    return this.configService.getOrThrow<number>('MONGO_DB_PORT');
  }

  get MONGO_DB_CONNECTION_URI() {
    return `mongodb://${this.MONGO_DB_USERNAME}:${this.MONGO_DB_PASSWORD}@${this.MONGO_DB_HOST}:${this.MONGO_DB_PORT}/${this.MONGO_DB_NAME}?authSource=admin`;
  }

  get QUEUE_CLIENT_ID() {
    return this.configService.getOrThrow<string>('QUEUE_CLIENT_ID');
  }

  get CONSUMER_GROUP_ID() {
    return this.configService.getOrThrow<string>('CONSUMER_GROUP_ID');
  }

  get GRPC_OPTIONS(): GrpcOptions {
    const options: GrpcOptions = {
      transport: Transport.GRPC,
      options: {
        protoPath: [
          join(__dirname, '../proto/likes.proto'),
          join(__dirname, '../proto/health.proto'),
        ],
        package: [LIKE_PACKAGE_NAME, GRPC_HEALTH_V1_PACKAGE_NAME],
        url: `0.0.0.0:${this.SERVICE_PORT}`,
        onLoadPackageDefinition(pkg, server) {
          new ReflectionService(pkg).addToServer(server);
        },
      },
    };
    return options;
  }

  get CACHE_HOST() {
    return this.configService.getOrThrow<string>('CACHE_HOST');
  }

  get CACHE_PORT() {
    return this.configService.getOrThrow<number>('CACHE_PORT');
  }

  get AGGREGATOR_CLIENT_ID() {
    return this.configService.getOrThrow<string>('AGGREGATOR_CLIENT_ID');
  }

  get AGGREGATOR_CONSUMER_ID() {
    return this.configService.getOrThrow<string>('AGGREGATOR_CONSUMER_ID');
  }

  get KAFKA_SERVICE_HOST() {
    return this.configService.getOrThrow<string>('KAFKA_SERVICE_HOST');
  }

  get KAFKA_SERVICE_PORT() {
    return this.configService.getOrThrow<string>('KAFKA_SERVICE_PORT');
  }

  get AGGREGATOR_SERVICE_OPTIONS(): KafkaOptions {
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
}
