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
        GRPC_PORT: joi.number().required(),
        DATABASE_URL: joi.string().required(),
        CACHE_HOST: joi.string().required(),
        CACHE_PORT: joi.number().required(),
        MESSAGE_BROKER_HOST: joi.string().required(),
        MESSAGE_BROKER_PORT: joi.number().required(),
        BUFFER_KEY: joi.string().required(),
        BUFFER_GROUPNAME: joi.string().required(),
        BUFFER_REDIS_CONSUMER_ID: joi.string().required(),
        BUFFER_CLIENT_ID: joi.string().required(),
        BUFFER_KAFKA_CONSUMER_ID: joi.string().required(),
        BUFFER_FLUSH_MAX_WAIT_TIME_MS: joi.string().required(),
        GRAFANA_LOKI_URL: joi.string().required(),
      }),
    }),
  ],
  exports: [AppConfigService],
})
export class AppConfigModule {}
