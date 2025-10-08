/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { ReflectionService } from '@grpc/reflection';

import { HUB_PACKAGE_NAME } from '@app/contracts/hub';
import { GRPC_HEALTH_V1_PACKAGE_NAME } from '@app/contracts/health';

@Injectable()
export class AppConfigService {
  public constructor(private configService: ConfigService) {}

  get SERVICE_PORT() {
    return this.configService.getOrThrow<number>('SERVICE_PORT');
  }

  get HTTP_PORT() {
    return this.configService.getOrThrow<number>('HTTP_PORT');
  }

  get DATABASE_URL() {
    return this.configService.getOrThrow<number>('DATABASE_URL');
  }

  get SERVICE_OPTIONS(): GrpcOptions {
    return {
      transport: Transport.GRPC,
      options: {
        package: [HUB_PACKAGE_NAME, GRPC_HEALTH_V1_PACKAGE_NAME],
        protoPath: [
          join(__dirname, '../proto/hub.proto'),
          join(__dirname, '../proto/health.proto'),
        ],
        url: `0.0.0.0:${this.SERVICE_PORT}`,
        onLoadPackageDefinition(pkg, server) {
          new ReflectionService(pkg).addToServer(server);
        },
      },
    };
  }
}
