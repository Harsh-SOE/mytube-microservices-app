/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcOptions, Transport } from '@nestjs/microservices';
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

  get MESSAGE_BROKER_SERVICE_HOST() {
    return this.configService.getOrThrow<string>('KAFKA_SERVICE_HOST');
  }

  get MESSAGE_BROKER_SERVICE_PORT() {
    return this.configService.getOrThrow<number>('KAFKA_SERVICE_PORT');
  }

  get COMMENT_STREAM_KEY() {
    return this.configService.getOrThrow<string>('COMMENT_STREAM_KEY');
  }

  get COMMENT_STREAM_GROUPNAME() {
    return this.configService.getOrThrow<string>('COMMENT_STREAM_GROUPNAME');
  }
}
