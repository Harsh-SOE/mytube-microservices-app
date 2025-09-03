/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { GRPC_HEALTH_V1_PACKAGE_NAME } from '@app/contracts/health';
import { VIDEO_PACKAGE_NAME } from '@app/contracts/videos';
import { ReflectionService } from '@grpc/reflection';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcOptions, KafkaOptions, Transport } from '@nestjs/microservices';
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

  get VIDEO_TRANSCODER_CLIENT_ID() {
    return this.configService.getOrThrow<string>('VIDEO_TRANSCODER_CLIENT_ID');
  }

  get VIDEO_TRANSCODER_CONSUMER_GROUP_ID() {
    return this.configService.getOrThrow<string>(
      'VIDEO_TRANSCODER_CONSUMER_GROUP_ID',
    );
  }

  get VIDEO_TRANSCODER_SERVICE_PORT() {
    return this.configService.getOrThrow<number>(
      'VIDEO_TRANSCODER_SERVICE_PORT',
    );
  }

  get VIDEO_TRANSCODER_SERVICE_HOST() {
    return this.configService.getOrThrow<string>(
      'VIDEO_TRANSCODER_SERVICE_HOST',
    );
  }

  get VIDEO_TRANSCODER_SERVICE_OPTIONS() {
    const options: KafkaOptions = {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: this.VIDEO_TRANSCODER_CLIENT_ID,
          brokers: [
            `${this.VIDEO_TRANSCODER_SERVICE_HOST}:${this.VIDEO_TRANSCODER_SERVICE_PORT}`,
          ],
        },
        consumer: {
          groupId: this.VIDEO_TRANSCODER_CONSUMER_GROUP_ID,
        },
      },
    };
    return options;
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

  get GRPC_OPTIONS(): GrpcOptions {
    const options: GrpcOptions = {
      transport: Transport.GRPC,
      options: {
        protoPath: [
          join(__dirname, '../proto/videos.proto'),
          join(__dirname, '../proto/health.proto'),
        ],
        package: [VIDEO_PACKAGE_NAME, GRPC_HEALTH_V1_PACKAGE_NAME],
        url: `0.0.0.0:${this.SERVICE_PORT}`,
        onLoadPackageDefinition(pkg, server) {
          new ReflectionService(pkg).addToServer(server);
        },
      },
    };
    return options;
  }
}
