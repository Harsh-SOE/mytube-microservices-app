import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcOptions, KafkaOptions, Transport } from '@nestjs/microservices';
import { ReflectionService } from '@grpc/reflection';
import * as protoLoader from '@grpc/proto-loader';
import * as grpc from '@grpc/grpc-js';
import { join } from 'path';

import { GRPC_HEALTH_V1_PACKAGE_NAME } from '@app/contracts/health';
import { WATCH_PACKAGE_NAME } from '@app/contracts/watch';

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
        package: [WATCH_PACKAGE_NAME, GRPC_HEALTH_V1_PACKAGE_NAME],
        protoPath: [
          join(__dirname, '../proto/watch.proto'),
          join(__dirname, '../proto/health.proto'),
        ],
        url: `${this.SERVICE_HOST}:${this.SERVICE_PORT}`,
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

  public get WATCH_CLIENT_ID() {
    return this.configService.getOrThrow<string>('WATCH_CLIENT_ID');
  }

  public get WATCH_CONSUMER_ID() {
    return this.configService.getOrThrow<string>('WATCH_CONSUMER_ID');
  }

  public get SERVICE_MESSAGE_CONSUMER_OPTIONS(): KafkaOptions {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers: [`${this.KAFKA_SERVICE_HOST}:${this.KAFKA_SERVICE_PORT}`],
          clientId: this.WATCH_CLIENT_ID,
        },
        consumer: { groupId: this.WATCH_CONSUMER_ID },
      },
    };
  }
}
