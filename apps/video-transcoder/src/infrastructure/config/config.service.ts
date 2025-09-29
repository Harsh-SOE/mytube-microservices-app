import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { GrpcOptions, KafkaOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

import { CLOUD_PACKAGE_NAME } from '@app/contracts/cloud';

@Injectable()
export class AppConfigService {
  constructor(private configService: ConfigService) {}

  get KAFKA_SERVICE_PORT() {
    return this.configService.getOrThrow<number>('KAFKA_SERVICE_PORT');
  }

  get KAFKA_SERVICE_HOST() {
    return this.configService.getOrThrow<string>('KAFKA_SERVICE_HOST');
  }

  get HTTP_PORT() {
    return this.configService.getOrThrow<number>('HTTP_PORT');
  }

  get VIDEO_TRANSCODER_CLIENT_ID() {
    return this.configService.getOrThrow<string>('VIDEO_TRANSCODER_CLIENT_ID');
  }

  get VIDEO_TRANSCODER_CONSUMER_ID() {
    return this.configService.getOrThrow<string>(
      'VIDEO_TRANSCODER_CONSUMER_ID',
    );
  }

  get KAFKA_OPTIONS(): KafkaOptions {
    const options: KafkaOptions = {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: this.VIDEO_TRANSCODER_CLIENT_ID,
          brokers: [`${this.KAFKA_SERVICE_HOST}:${this.KAFKA_SERVICE_PORT}`],
        },
        consumer: {
          groupId: this.VIDEO_TRANSCODER_CONSUMER_ID,
        },
      },
    };
    return options;
  }

  get CLOUD_SERVICE_PORT() {
    return this.configService.getOrThrow<number>('CLOUD_SERVICE_PORT');
  }

  get CLOUD_SERVICE_HOST() {
    return this.configService.getOrThrow<string>('CLOUD_SERVICE_HOST');
  }

  get GRAFANA_LOKI_URL() {
    return this.configService.getOrThrow<string>('GRAFANA_LOKI_URL');
  }

  get CLOUD_SERVICE_OPTIONS(): GrpcOptions {
    return {
      transport: Transport.GRPC,
      options: {
        protoPath: join(__dirname, '../proto/cloud.proto'),
        package: CLOUD_PACKAGE_NAME,
        url: `${this.CLOUD_SERVICE_HOST}:${this.CLOUD_SERVICE_PORT}`,
      },
    };
  }
}
