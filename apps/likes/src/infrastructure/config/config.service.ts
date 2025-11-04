/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { ReflectionService } from '@grpc/reflection';

import { LIKE_PACKAGE_NAME } from '@app/contracts/likes';
import { GRPC_HEALTH_V1_PACKAGE_NAME } from '@app/contracts/health';

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

  public get DATABASE_URL() {
    return this.configService.getOrThrow<string>('DATABASE_URL');
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

  get MESSAGE_BROKER_SERVICE_HOST() {
    return this.configService.getOrThrow<string>('MESSAGE_BROKER_SERVICE_HOST');
  }

  get MESSAGE_BROKER_SERVICE_PORT() {
    return this.configService.getOrThrow<number>('MESSAGE_BROKER_SERVICE_PORT');
  }

  get LIKE_STREAM_KEY() {
    return this.configService.getOrThrow<string>('LIKE_STREAM_KEY');
  }

  get LIKE_STREAM_GROUPNAME() {
    return this.configService.getOrThrow<string>('LIKE_STREAM_GROUPNAME');
  }
}
