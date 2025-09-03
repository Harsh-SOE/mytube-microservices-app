import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';

import { AppConfigService } from './config.service';
import { join } from 'path';

@Module({
  providers: [AppConfigService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../../.env'),
      isGlobal: true,
      validationSchema: joi.object({
        HTTP_PORT: joi.number().required(),
        SERVICE_PORT: joi.number().required(),
        PRIVATE_KEY: joi.string().required(),
        DB_HOST: joi.string().required(),
        DB_PORT: joi.number().required(),
        DB_USER: joi.string().required(),
        DB_PASS: joi.string().required(),
        DB_NAME: joi.string().required(),
        JWT_ACCESS_TOKEN_EXPIRY: joi.string().required(),
        FGA_API_URL: joi.string().required(),
        FGA_STORE_ID: joi.string().required(),
        FGA_MODEL_ID: joi.string().required(),
        GRAFANA_LOKI_URL: joi.string().required(),
        USER_SERVICE_PORT: joi.number().required(),
        USER_SERVICE_HOST: joi.string().required(),
        DB_MAX_CONNECTIONS: joi.number().required(),
        DB_MIN_CONNECTIONS: joi.number().required(),
        DB_CONNECTION_IDLE_TIMEOUT: joi.number().required(),
      }),
    }),
  ],
  exports: [AppConfigService],
})
export class AppConfigModule {}
