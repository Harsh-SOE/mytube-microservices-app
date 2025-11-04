import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import { join } from 'path';

import { AppConfigService } from './config.service';

@Module({
  providers: [AppConfigService],
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '../../.env'),
      validationSchema: joi.object({
        HTTP_PORT: joi.number().required(),
        SERVICE_PORT: joi.number().required(),
        GRAFANA_LOKI_URL: joi.string().required(),
        DATABASE_URL: joi.string().required(),
        CACHE_HOST: joi.string().required(),
        CACHE_PORT: joi.number().required(),
        MESSAGE_BROKER_SERVICE_HOST: joi.string().required(),
        MESSAGE_BROKER_SERVICE_PORT: joi.number().required(),
        LIKE_STREAM_KEY: joi.string().required(),
        LIKE_STREAM_GROUPNAME: joi.string().required(),
      }),
    }),
  ],
  exports: [AppConfigService],
})
export class AppConfigModule {}
