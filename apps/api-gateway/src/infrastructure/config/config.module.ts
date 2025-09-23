import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';

import { AppConfigService } from './config.service';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '../../.env'),
      validationSchema: joi.object({
        PORT: joi.number().required(),
        NODE_ENVIRONMENT: joi.string().required(),
        PUBLIC_KEY: joi.string().required(),
        ACCESS_TOKEN_EXPIRY: joi.string().required(),
        GRAFANA_LOKI_URL: joi.string().required(),
        AUTH_SERVICE_HOST: joi.string().required(),
        AUTH_SERVICE_PORT: joi.number().required(),
        CLOUD_SERVICE_HOST: joi.string().required(),
        CLOUD_SERVICE_PORT: joi.number().required(),
        USER_SERVICE_HOST: joi.string().required(),
        USER_SERVICE_PORT: joi.number().required(),
        LIKE_SERVICE_HOST: joi.string().required(),
        LIKE_SERVICE_PORT: joi.number().required(),
        VIDEO_SERVICE_HOST: joi.string().required(),
        VIDEO_SERVICE_PORT: joi.number().required(),
        WATCH_SERVICE_HOST: joi.string().required(),
        WATCH_SERVICE_PORT: joi.number().required(),
        SAGA_SERVICE_HOST: joi.string().required(),
        SAGA_SERVICE_PORT: joi.number().required(),
        COMMENT_SERVICE_HOST: joi.string().required(),
        COMMENT_SERVICE_PORT: joi.number().required(),
        REDIS_HOST: joi.string().required(),
        REDIS_PORT: joi.number().required(),
      }),
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
