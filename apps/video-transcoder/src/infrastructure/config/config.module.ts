import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import { join } from 'path';

import { AppConfigService } from './config.service';

@Module({
  providers: [AppConfigService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../../.env'),
      isGlobal: true,
      validationSchema: joi.object({
        HTTP_PORT: joi.number().required(),
        MESSAGE_BROKER_HOST: joi.string().required(),
        MESSAGE_BROKER_PORT: joi.number().required(),
        AWS_REGION: joi.string().required(),
        AWS_BUCKET: joi.string().required(),
        AWS_ACCESS_KEY: joi.string().required(),
        AWS_ACCESS_SECRET: joi.string().required(),
        VIDEO_TRANSCODER_CLIENT_ID: joi.string().required(),
        VIDEO_TRANSCODER_CONSUMER_ID: joi.string().required(),
        GRAFANA_LOKI_URL: joi.string().required(),
      }),
    }),
  ],
  exports: [AppConfigService],
})
export class AppConfigModule {}
