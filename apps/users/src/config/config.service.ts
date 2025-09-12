/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { Injectable } from '@nestjs/common';
import { GrpcOptions, KafkaOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';

import { USER_PACKAGE_NAME } from '@app/contracts/users';
import { GRPC_HEALTH_V1_PACKAGE_NAME } from '@app/contracts/health';
import { ReflectionService } from '@grpc/reflection';

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

  get DB_NAME() {
    return this.configService.getOrThrow<string>('DB_NAME');
  }

  get DB_USER() {
    return this.configService.getOrThrow<string>('DB_USER');
  }

  get DB_PASSWORD() {
    return this.configService.getOrThrow<string>('DB_PASSWORD');
  }

  get DB_HOST() {
    return this.configService.getOrThrow<string>('DB_HOST');
  }

  get DB_PORT() {
    return this.configService.getOrThrow<number>('DB_PORT');
  }

  get DB_URL() {
    return this.configService.getOrThrow<string>('DATABASE_URL');
  }

  get EMAIL_CLIENT_ID() {
    return this.configService.getOrThrow<string>('EMAIL_CLIENT_ID');
  }

  get EMAIL_CONSUMER_GROUP_ID() {
    return this.configService.getOrThrow<string>('EMAIL_CONSUMER_GROUP_ID');
  }

  get EMAIL_SERVICE_PORT() {
    return this.configService.getOrThrow<number>('EMAIL_SERVICE_PORT');
  }

  get EMAIL_SERVICE_HOST() {
    return this.configService.getOrThrow<string>('EMAIL_SERVICE_HOST');
  }

  get EMAIL_SERVICE_OPTIONS() {
    const options: KafkaOptions = {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: this.EMAIL_CLIENT_ID,
          brokers: [`${this.EMAIL_SERVICE_HOST}:${this.EMAIL_SERVICE_PORT}`],
        },
        consumer: {
          groupId: this.EMAIL_CONSUMER_GROUP_ID,
        },
      },
    };
    return options;
  }

  get WATCH_CLIENT_ID() {
    return this.configService.getOrThrow<string>('WATCH_CLIENT_ID');
  }

  get WATCH_CONSUMER_GROUP_ID() {
    return this.configService.getOrThrow<string>('WATCH_CONSUMER_GROUP_ID');
  }

  get WATCH_SERVICE_PORT() {
    return this.configService.getOrThrow<number>('WATCH_SERVICE_PORT');
  }

  get WATCH_SERVICE_HOST() {
    return this.configService.getOrThrow<string>('WATCH_SERVICE_HOST');
  }

  get WATCH_SERVICE_OPTIONS() {
    const options: KafkaOptions = {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: this.WATCH_CLIENT_ID,
          brokers: [`${this.WATCH_SERVICE_HOST}:${this.WATCH_SERVICE_PORT}`],
        },
        consumer: {
          groupId: this.WATCH_CONSUMER_GROUP_ID,
        },
      },
    };
    return options;
  }

  get MAX_DB_CONNECTIONS() {
    return this.configService.getOrThrow<number>('MAX_DB_CONNECTIONS');
  }

  get MIN_DB_CONNECTIONS() {
    return this.configService.getOrThrow<number>('MIN_DB_CONNECTIONS');
  }

  get DB_IDLE_CONNECTION_TIMEOUT() {
    return this.configService.getOrThrow<number>('DB_IDLE_CONNECTION_TIMEOUT');
  }

  get DB_QUERY_CONNECTION_TIMEOUT() {
    return this.configService.getOrThrow<number>('DB_QUERY_CONNECTION_TIMEOUT');
  }

  get GRPC_OPTIONS(): GrpcOptions {
    const options: GrpcOptions = {
      transport: Transport.GRPC,
      options: {
        protoPath: [
          join(__dirname, '../proto/users.proto'),
          join(__dirname, '../proto/health.proto'),
        ],
        package: [USER_PACKAGE_NAME, GRPC_HEALTH_V1_PACKAGE_NAME],
        url: `0.0.0.0:${this.SERVICE_PORT}`,
        onLoadPackageDefinition(pkg, server) {
          new ReflectionService(pkg).addToServer(server);
        },
      },
    };
    return options;
  }
}
