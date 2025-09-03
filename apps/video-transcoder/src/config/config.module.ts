import { Module } from '@nestjs/common';
import { AppConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import { join } from 'path';

@Module({
  providers: [AppConfigService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../../.env'),
      isGlobal: true,
      validationSchema: joi.object({
        HTTP_PORT: joi.number().required(),
        KAFKA_SERVICE_HOST: joi.string().required(),
        KAFKA_SERVICE_PORT: joi.number().required(),
        GRAFANA_LOKI_URL: joi.string().required(),
        CLOUD_SERVICE_HOST: joi.string().required(),
        CLOUD_SERVICE_PORT: joi.number().required(),
        VIDEO_TRANSCODER_CLIENT_ID: joi.string().required(),
        VIDEO_TRANSCODER_CONSUMER_ID: joi.string().required(),
      }),
    }),
  ],
  exports: [AppConfigService],
})
export class AppConfigModule {}
