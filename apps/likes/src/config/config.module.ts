import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';

import { AppConfigService } from './config.service';
import { join } from 'path';

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
        MONGO_DB_USERNAME: joi.string().required(),
        MONGO_DB_PASSWORD: joi.string().required(),
        MONGO_DB_HOST: joi.string().required(),
        MONGO_DB_PORT: joi.number().required(),
        CACHE_HOST: joi.string().required(),
        CACHE_PORT: joi.number().required(),
      }),
    }),
  ],
  exports: [AppConfigService],
})
export class AppConfigModule {}
