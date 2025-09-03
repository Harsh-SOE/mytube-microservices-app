/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { AUTH_PACKAGE_NAME } from '@app/contracts/auth';
import { GRPC_HEALTH_V1_PACKAGE_NAME } from '@app/contracts/health';
import { USER_PACKAGE_NAME } from '@app/contracts/users';
import { ReflectionService } from '@grpc/reflection';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get HTTP_PORT() {
    return this.configService.getOrThrow<number>('HTTP_PORT');
  }

  get SERVICE_PORT() {
    return this.configService.getOrThrow<number>('SERVICE_PORT');
  }

  get DB_PORT() {
    return this.configService.getOrThrow<number>('DB_PORT');
  }

  get DB_HOST() {
    return this.configService.getOrThrow<string>('DB_HOST');
  }

  get DB_USER() {
    return this.configService.getOrThrow<string>('DB_USER');
  }

  get DB_PASS() {
    return this.configService.getOrThrow<string>('DB_PASS');
  }

  get DB_NAME() {
    return this.configService.getOrThrow<string>('DB_NAME');
  }

  get AUTH_DATABASE_URI() {
    return `mongodb://${this.DB_USER}:${this.DB_PASS}@${this.DB_HOST}:${this.DB_PORT}/${this.DB_NAME}?authSource=admin`;
  }

  get FGA_API_URL() {
    return this.configService.getOrThrow<string>('FGA_API_URL');
  }

  get FGA_STORE_ID() {
    return this.configService.getOrThrow<string>('FGA_STORE_ID');
  }

  get FGA_MODEL_ID() {
    return this.configService.getOrThrow<string>('FGA_MODEL_ID');
  }

  get JWT_ACCESS_TOKEN_EXPIRY() {
    return this.configService.getOrThrow<string>('JWT_ACCESS_TOKEN_EXPIRY');
  }

  get GRAFANA_LOKI_URL() {
    return this.configService.getOrThrow<string>('GRAFANA_LOKI_URL');
  }

  get JWT_PRIVATE_KEY() {
    const privateKey = this.configService.getOrThrow<string>('PRIVATE_KEY');
    return Buffer.from(privateKey, 'base64').toString('utf8');
  }

  get USER_SERVICE_PORT() {
    return this.configService.getOrThrow<number>('USER_SERVICE_PORT');
  }

  get USER_SERVICE_HOST() {
    return this.configService.getOrThrow<string>('USER_SERVICE_HOST');
  }

  get USER_CLIENT_OPTIONS() {
    const userClientOptions: GrpcOptions = {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../proto/users.proto'),
        package: USER_PACKAGE_NAME,
        url: `${this.USER_SERVICE_HOST}:${this.USER_SERVICE_PORT}`,
      },
    };
    return userClientOptions;
  }

  get DB_MAX_CONNECTIONS() {
    return this.configService.getOrThrow<number>('DB_MAX_CONNECTIONS');
  }

  get DB_MIN_CONNECTIONS() {
    return this.configService.getOrThrow<number>('DB_MIN_CONNECTIONS');
  }

  get DB_CONNECTION_IDLE_TIMEOUT() {
    return this.configService.getOrThrow<number>('DB_CONNECTION_IDLE_TIMEOUT');
  }

  get GRPC_OPTIONS(): GrpcOptions {
    const options: GrpcOptions = {
      transport: Transport.GRPC,
      options: {
        protoPath: [
          join(__dirname, '../proto/auth.proto'),
          join(__dirname, '../proto/health.proto'),
        ],
        package: [AUTH_PACKAGE_NAME, GRPC_HEALTH_V1_PACKAGE_NAME],
        url: `0.0.0.0:${this.SERVICE_PORT}`,
        onLoadPackageDefinition(pkg, server) {
          new ReflectionService(pkg).addToServer(server);
        },
      },
    };
    return options;
  }
}
