/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ReflectionService } from '@grpc/reflection';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import path from 'path';

import { GRPC_HEALTH_V1_PACKAGE_NAME } from '@app/contracts/health';
import { SUBSCRIBE_PACKAGE_NAME } from '@app/contracts/subscribe';

@Injectable()
export class AppConfigService {
  public constructor(private readonly configService: ConfigService) {}

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
        package: [SUBSCRIBE_PACKAGE_NAME, GRPC_HEALTH_V1_PACKAGE_NAME],
        protoPath: [
          path.join(__dirname, 'proto/subscribe.proto'),
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
