import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import * as joi from 'joi';

import { AppConfigService } from './config.service';

@Module({
  providers: [AppConfigService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../../.env'),
      isGlobal: true,
      validationSchema: joi.object({
        HTTP_PORT: joi.number().required(),
        KAFKA_SERVICE_HOST: joi.string().required(),
        KAFKA_SERVICE_PORT: joi.string().required(),
        GRAFANA_LOKI_URL: joi.string().required(),
        EMAIL_CLIENT_ID: joi.string().required(),
        EMAIL_CONSUMER_ID: joi.string().required(),
        EMAIL_API_KEY: joi.string().required(),
        FROM_EMAIL: joi.string().required(),
      }),
    }),
  ],
  exports: [AppConfigService],
})
export class AppConfigModule {}
