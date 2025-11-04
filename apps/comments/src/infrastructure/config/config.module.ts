import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';

import { AppConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../.env',
      isGlobal: true,
      validationSchema: joi.object({
        SERVICE_HOST: joi.string().required(),
        SERVICE_PORT: joi.number().required(),
        HTTP_PORT: joi.number().required(),
        GRAFANA_LOKI_URL: joi.string().required(),
        CACHE_HOST: joi.string().required(),
        CACHE_PORT: joi.number().required(),
        KAFKA_SERVICE_HOST: joi.string().required(),
        KAFKA_SERVICE_PORT: joi.number().required(),
        COMMENT_STREAM_KEY: joi.string().required(),
        COMMENT_STREAM_GROUPNAME: joi.string().required(),
        DATABASE_URL: joi.string().required(),
      }),
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
