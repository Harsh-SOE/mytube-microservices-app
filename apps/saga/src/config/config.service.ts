/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { Injectable } from '@nestjs/common';
import { join } from 'path';

import { ConfigService } from '@nestjs/config';
import { SAGA_PACKAGE_NAME } from '@app/contracts/saga';
import { USER_PACKAGE_NAME } from '@app/contracts/users';
import { GRPC_HEALTH_V1_PACKAGE_NAME } from '@app/contracts/health';
import { ReflectionService } from '@grpc/reflection';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get SERVICE_PORT() {
    return this.configService.getOrThrow<number>('SERVICE_PORT');
  }

  get HTTP_PORT() {
    return this.configService.getOrThrow<number>('HTTP_PORT');
  }

  get GRAFANA_LOKI_URL() {
    return this.configService.getOrThrow<string>('GRAFANA_LOKI_URL');
  }

  get USER_SERVICE_PORT() {
    return this.configService.getOrThrow<number>('USER_SERVICE_PORT');
  }

  get USER_SERVICE_HOST() {
    return this.configService.getOrThrow<string>('USER_SERVICE_HOST');
  }

  get USER_SERVICE_OPTIONS(): GrpcOptions {
    const options: GrpcOptions = {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, 'proto/users.proto'),
        package: USER_PACKAGE_NAME,
        url: `${this.USER_SERVICE_HOST}:${this.USER_SERVICE_PORT}`,
      },
    };
    return options;
  }

  get GRPC_OPTIONS(): GrpcOptions {
    const options: GrpcOptions = {
      transport: Transport.GRPC,
      options: {
        protoPath: [
          join(__dirname, 'proto/saga.proto'),
          join(__dirname, 'proto/health.proto'),
        ],
        package: [SAGA_PACKAGE_NAME, GRPC_HEALTH_V1_PACKAGE_NAME],
        url: `0.0.0.0:${this.SERVICE_PORT}`,
        onLoadPackageDefinition(pkg, server) {
          new ReflectionService(pkg).addToServer(server);
        },
      },
    };
    return options;
  }
}
