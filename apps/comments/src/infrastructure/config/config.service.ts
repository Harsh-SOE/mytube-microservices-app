/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcOptions, KafkaOptions, Transport } from '@nestjs/microservices';
import { ReflectionService } from '@grpc/reflection';
import { join } from 'path';

import { COMMENT_PACKAGE_NAME } from '@app/contracts/comments/comments';
import { GRPC_HEALTH_V1_PACKAGE_NAME } from '@app/contracts/health';

@Injectable()
export class AppConfigService {
  public constructor(private configService: ConfigService) {}

  public get GRPC_SERVICE_PORT() {
    return this.configService.getOrThrow<number>('SERVICE_PORT');
  }

  public get HTTP_SERVICE_PORT() {
    return this.configService.getOrThrow<number>('HTTP_PORT');
  }

  public get GRAFANA_LOKI_URL() {
    return this.configService.getOrThrow<string>('GRAFANA_LOKI_URL');
  }

  public get CACHE_HOST() {
    return this.configService.getOrThrow<string>('CACHE_HOST');
  }

  public get CACHE_PORT() {
    return this.configService.getOrThrow<number>('CACHE_PORT');
  }

  public get SERVICE_OPTION(): GrpcOptions {
    return {
      transport: Transport.GRPC,
      options: {
        protoPath: [
          join(__dirname, '../proto/comments.proto'),
          join(__dirname, '../proto/health.proto'),
        ],
        package: [COMMENT_PACKAGE_NAME, GRPC_HEALTH_V1_PACKAGE_NAME],
        url: `0.0.0.0:${this.GRPC_SERVICE_PORT}`,
        onLoadPackageDefinition(pkg, server) {
          new ReflectionService(pkg).addToServer(server);
        },
      },
    };
  }

  get AGGREGATOR_CLIENT_ID() {
    return this.configService.getOrThrow<string>(
      'COMMENTS_AGGREGATOR_CLIENT_ID',
    );
  }

  get AGGREGATOR_CONSUMER_GROUP_ID() {
    return this.configService.getOrThrow<string>(
      'COMMENTS_AGGREGATOR_CONSUMER_GROUP_ID',
    );
  }

  get MESSAGE_BROKER_SERVICE_HOST() {
    return this.configService.getOrThrow<string>('KAFKA_SERVICE_HOST');
  }

  get MESSAGE_BROKER_SERVICE_PORT() {
    return this.configService.getOrThrow<number>('KAFKA_SERVICE_PORT');
  }

  get COMMENTS_AGGREGATOR_SERVICE_OPTIONS(): KafkaOptions {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: this.AGGREGATOR_CLIENT_ID,
          brokers: [
            `${this.MESSAGE_BROKER_SERVICE_HOST}:${this.MESSAGE_BROKER_SERVICE_PORT}`,
          ],
          connectionTimeout: 30000,
          retry: {
            initialRetryTime: 300,
            retries: 10,
          },
        },
        consumer: {
          groupId: this.AGGREGATOR_CONSUMER_GROUP_ID,
          sessionTimeout: 30000,
          allowAutoTopicCreation: true,
        },
      },
    };
  }
}
