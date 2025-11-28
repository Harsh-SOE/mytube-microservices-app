/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { ReflectionService } from '@grpc/reflection';
import path from 'path';

import { GRPC_HEALTH_V1_PACKAGE_NAME } from '@app/contracts/health';
import { HISTORY_PACKAGE_NAME } from '@app/contracts/history/history';

@Injectable()
export class AppConfigService {
  constructor(public readonly configService: ConfigService) {}

  get HTTP_PORT() {
    return this.configService.getOrThrow<number>('HTTP_PORT');
  }

  get GRPC_PORT() {
    return this.configService.getOrThrow<number>('GRPC_PORT');
  }

  get GRPC_OPTIONS(): GrpcOptions {
    return {
      transport: Transport.GRPC,
      options: {
        package: [GRPC_HEALTH_V1_PACKAGE_NAME, HISTORY_PACKAGE_NAME],
        protoPath: [
          path.join(__dirname, 'proto/history.proto'),
          path.join(__dirname, 'proto/health.proto'),
        ],
        url: `0.0.0.0:${this.GRPC_PORT}`,
        onLoadPackageDefinition(pkg, server) {
          new ReflectionService(pkg).addToServer(server);
        },
      },
    };
  }
}
