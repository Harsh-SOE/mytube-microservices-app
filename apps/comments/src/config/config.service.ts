/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { COMMENT_PACKAGE_NAME } from '@app/contracts/comments/comments';
import { GRPC_HEALTH_V1_PACKAGE_NAME } from '@app/contracts/health';
import { ReflectionService } from '@grpc/reflection';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcOptions, KafkaOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Injectable()
export class AppConfigService {
  public constructor(private configService: ConfigService) {}

  public get SERVICE_HOST() {
    return this.configService.getOrThrow<string>('SERVICE_HOST');
  }

  public get SERVICE_PORT() {
    return this.configService.getOrThrow<number>('SERVICE_PORT');
  }

  public get HTTP_PORT() {
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
        url: `0.0.0.0:${this.SERVICE_PORT}`,
        onLoadPackageDefinition(pkg, server) {
          new ReflectionService(pkg).addToServer(server);
        },
      },
    };
  }

  get COMMENTS_AGGREGATOR_CLIENT_ID() {
    return this.configService.getOrThrow<string>(
      'COMMENTS_AGGREGATOR_CLIENT_ID',
    );
  }

  get COMMENTS_AGGREGATOR_CONSUMER_GROUP_ID() {
    return this.configService.getOrThrow<string>(
      'COMMENTS_AGGREGATOR_CONSUMER_GROUP_ID',
    );
  }

  get KAFKA_SERVICE_HOST() {
    return this.configService.getOrThrow<string>('KAFKA_SERVICE_HOST');
  }

  get KAFKA_SERVICE_PORT() {
    return this.configService.getOrThrow<number>('KAFKA_SERVICE_PORT');
  }

  get COMMENTS_AGGREGATOR_OPTION(): KafkaOptions {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: this.COMMENTS_AGGREGATOR_CLIENT_ID,
          brokers: [`${this.KAFKA_SERVICE_HOST}:${this.KAFKA_SERVICE_PORT}`],
        },
        consumer: { groupId: this.COMMENTS_AGGREGATOR_CONSUMER_GROUP_ID },
      },
    };
  }
}
