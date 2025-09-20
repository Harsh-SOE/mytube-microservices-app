import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import * as joi from 'joi';

import { AppConfigService } from './config.service';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '../../.env'),
      validationSchema: joi.object({
        SERVICE_HOST: joi.string().required(),
        SERVICE_PORT: joi.number().required(),
        HTTP_PORT: joi.number().required(),
        VIEWS_AGGREGATOR_CLIENT_ID: joi.string().required(),
        VIEWS_AGGREGATOR_CONSUMER_ID: joi.string().required(),
        CACHE_HOST: joi.string().required(),
        CACHE_PORT: joi.number().required(),
        WATCH_STREAM_KEY: joi.string().required(),
        WATCH_STREAM_GROUP_NAME: joi.string().required(),
      }),
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
