import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class AppConfigService {
  public constructor(private configService: ConfigService) {}

  get COMMENTS_AGGREGATOR_CLIENT_ID() {
    return this.configService.getOrThrow<string>(
      'COMMENTS_AGGREGATOR_CLIENT_ID',
    );
  }

  get COMMENTS_AGGREGATOR_CONSUMER_GROUP_ID() {
    return this.configService.getOrThrow<string>(
      'COMMENTS_AGGREGATOR_CONSUMER_GROUP_ID',
    );
  }

  get KAFKA_SERVICE_HOST() {
    return this.configService.getOrThrow<string>('KAFKA_SERVICE_HOST');
  }

  get KAFKA_SERVICE_PORT() {
    return this.configService.getOrThrow<number>('KAFKA_SERVICE_PORT');
  }

  get HTTP_PORT() {
    return this.configService.getOrThrow<number>('HTTP_PORT');
  }

  get GRAFANA_LOKI_URL() {
    return this.configService.getOrThrow<string>('GRAFANA_LOKI_URL');
  }

  get CACHE_SERVICE_HOST() {
    return this.configService.getOrThrow<string>('CACHE_SERVICE_HOST');
  }

  get CACHE_SERVICE_PORT() {
    return this.configService.getOrThrow<number>('CACHE_SERVICE_PORT');
  }

  get COMMENT_AGGREGATOR_CACHE_STREAM_KEY() {
    return this.configService.getOrThrow<string>(
      'COMMENT_AGGREGATOR_CACHE_STREAM_KEY',
    );
  }

  get COMMENT_AGGREGATOR_CACHE_STREAM_GROUPNAME() {
    return this.configService.getOrThrow<string>(
      'COMMENT_AGGREGATOR_CACHE_STREAM_GROUPNAME',
    );
  }

  get SERVICE_OPTION(): KafkaOptions {
    return {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: this.COMMENTS_AGGREGATOR_CLIENT_ID,
          brokers: [`${this.KAFKA_SERVICE_PORT}:${this.KAFKA_SERVICE_PORT}`],
        },
        consumer: { groupId: this.COMMENTS_AGGREGATOR_CONSUMER_GROUP_ID },
      },
    };
  }
}
