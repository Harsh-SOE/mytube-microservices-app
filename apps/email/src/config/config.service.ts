import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { KafkaOptions, Transport } from '@nestjs/microservices';

@Injectable()
export class AppConfigService {
  constructor(private readonly configService: ConfigService) {}

  get GRAFANA_LOKI_URL() {
    return this.configService.getOrThrow<string>('GRAFANA_LOKI_URL');
  }

  get HTTP_PORT() {
    return this.configService.getOrThrow<number>('HTTP_PORT');
  }

  get KAFKA_SERVICE_HOST() {
    return this.configService.getOrThrow<string>('KAFKA_SERVICE_HOST');
  }

  get KAFKA_SERVICE_PORT() {
    return this.configService.getOrThrow<number>('KAFKA_SERVICE_PORT');
  }

  get EMAIL_CLIENT_ID() {
    return this.configService.getOrThrow<string>('EMAIL_CLIENT_ID');
  }

  get EMAIL_CONSUMER_ID() {
    return this.configService.getOrThrow<string>('EMAIL_CONSUMER_ID');
  }

  get KAFKA_OPTIONS(): KafkaOptions {
    const options: KafkaOptions = {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: this.EMAIL_CLIENT_ID,
          brokers: [`${this.KAFKA_SERVICE_HOST}:${this.KAFKA_SERVICE_PORT}`],
        },
        consumer: { groupId: this.EMAIL_CONSUMER_ID },
      },
    };
    return options;
  }
}
