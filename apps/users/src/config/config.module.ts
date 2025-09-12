import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import { join } from 'path';

import { AppConfigService } from './config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../../.env'),
      isGlobal: true,
      validationSchema: joi.object({
        HTTP_PORT: joi.number().required(),
        SERVICE_PORT: joi.number().required(),
        GRAFANA_LOKI_URL: joi.string().required(),
        DB_USER: joi.string().required(),
        DB_PASSWORD: joi.string().required(),
        DB_NAME: joi.string().required(),
        DB_HOST: joi.string().required(),
        DB_PORT: joi.number().required(),
        MAX_DB_CONNECTIONS: joi.number().required(),
        MIN_DB_CONNECTIONS: joi.number().required(),
        DB_IDLE_CONNECTION_TIMEOUT: joi.number().required(),
        DB_QUERY_CONNECTION_TIMEOUT: joi.number().required(),
        DATABASE_URL: joi.string().required(),
        EMAIL_CLIENT_ID: joi.string().required(),
        EMAIL_CONSUMER_GROUP_ID: joi.string().required(),
        EMAIL_SERVICE_HOST: joi.string().required(),
        EMAIL_SERVICE_PORT: joi.number().required(),
        // WATCH_CLIENT_ID: joi.string().required(),
        // WATCH_CONSUMER_GROUP_ID: joi.string().required(),
        // WATCH_SERVICE_HOST: joi.string().required(),
        // WATCH_SERVICE_PORT: joi.number().required(),
      }),
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
