import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcOptions, KafkaOptions, Transport } from '@nestjs/microservices';
import { ReflectionService } from '@grpc/reflection';
import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';
import { join } from 'path';

import { GRPC_HEALTH_V1_PACKAGE_NAME } from '@app/contracts/health';
import { VIEWS_PACKAGE_NAME } from '@app/contracts/views';

@Injectable()
export class AppConfigService {
  public constructor(private readonly configService: ConfigService) {}

  public get SERVICE_HOST() {
    return this.configService.getOrThrow<string>('SERVICE_HOST');
  }

  public get SERVICE_PORT() {
    return this.configService.getOrThrow<number>('SERVICE_PORT');
  }

  public get HTTP_PORT() {
    return this.configService.getOrThrow<number>('HTTP_PORT');
  }

  public get SERVICE_OPTIONS(): GrpcOptions {
    return {
      transport: Transport.GRPC,
      options: {
        package: [VIEWS_PACKAGE_NAME, GRPC_HEALTH_V1_PACKAGE_NAME],
        protoPath: [
          join(__dirname, '../proto/views.proto'),
          join(__dirname, '../proto/health.proto'),
        ],
        url: `0.0.0.0:${this.SERVICE_PORT}`,
        onLoadPackageDefinition(
          pkg: protoLoader.PackageDefinition,
          server: Pick<grpc.Server, 'addService'>,
        ) {
          new ReflectionService(pkg).addToServer(server);
        },
      },
    };
  }

  public get KAFKA_SERVICE_HOST() {
    return this.configService.getOrThrow<string>('KAFKA_SERVICE_HOST');
  }

  public get KAFKA_SERVICE_PORT() {
    return this.configService.getOrThrow<number>('KAFKA_SERVICE_PORT');
  }

  public get CACHE_HOST() {
    return this.configService.getOrThrow<string>('CACHE_HOST');
  }

  public get CACHE_PORT() {
    return this.configService.getOrThrow<number>('CACHE_PORT');
  }

  public get VIEWS_AGGREGATOR_CLIENT_ID() {
    return this.configService.getOrThrow<string>('VIEWS_AGGREGATOR_CLIENT_ID');
  }

  public get VIEWS_AGGREGATOR_CONSUMER_ID() {
    return this.configService.getOrThrow<string>(
      'VIEWS_AGGREGATOR_CONSUMER_ID',
    );
  }

  public get VIEW_AGGREGATOR_SERVICE_OPTIONS(): KafkaOptions {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: this.VIEWS_AGGREGATOR_CLIENT_ID,
          brokers: [`${this.KAFKA_SERVICE_HOST}:${this.KAFKA_SERVICE_PORT}`],
        },
        consumer: {
          groupId: this.VIEWS_AGGREGATOR_CONSUMER_ID,
        },
      },
    };
  }
}
