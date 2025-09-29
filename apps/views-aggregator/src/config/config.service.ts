import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class AppConfigService {
  public constructor(private configService: ConfigService) {}

  get SERVICE_HOST() {
    return this.configService.getOrThrow<string>('SERVICE_HOST');
  }

  get SERVICE_PORT() {
    return this.configService.getOrThrow<number>('SERVICE_PORT');
  }

  get HTTP_PORT() {
    return this.configService.getOrThrow<number>('HTTP_PORT');
  }

  get VIEWS_AGGREGATOR_CLIENT_ID() {
    return this.configService.getOrThrow<string>('VIEWS_AGGREGATOR_CLIENT_ID');
  }

  get VIEWS_AGGREGATOR_CONSUMER_ID() {
    return this.configService.getOrThrow<string>(
      'VIEWS_AGGREGATOR_CONSUMER_ID',
    );
  }

  get KAFKA_SERVICE_HOST() {
    return this.configService.getOrThrow<string>('KAFKA_SERVICE_HOST');
  }

  get KAFKA_SERVICE_PORT() {
    return this.configService.getOrThrow<number>('KAFKA_SERVICE_PORT');
  }

  get SERVICE_OPTIONS(): KafkaOptions {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: this.VIEWS_AGGREGATOR_CLIENT_ID,
          brokers: [`${this.KAFKA_SERVICE_HOST}:${this.KAFKA_SERVICE_PORT}`],
        },
        consumer: {
          groupId: this.VIEWS_AGGREGATOR_CONSUMER_ID,
        },
      },
    };
  }

  get CACHE_HOST() {
    return this.configService.getOrThrow<string>('CACHE_HOST');
  }

  get CACHE_PORT() {
    return this.configService.getOrThrow<number>('CACHE_PORT');
  }

  get WATCH_STREAM_KEY() {
    return this.configService.getOrThrow<string>('WATCH_STREAM_KEY');
  }

  get WATCH_STREAM_GROUP_NAME() {
    return this.configService.getOrThrow<string>('WATCH_STREAM_GROUP_NAME');
  }

  get GRAFANA_LOKI_URL() {
    return this.configService.getOrThrow<string>('GRAFANA_LOKI_URL');
  }
}
