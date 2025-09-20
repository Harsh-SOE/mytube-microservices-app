import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import * as joi from 'joi';

import { AppConfigService } from './config.service';

@Global()
@Module({
  providers: [AppConfigService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../.env'),
      isGlobal: true,
      validationSchema: joi.object({
        SERVICE_PORT: joi.number().required(),
        HTTP_PORT: joi.number().required(),
        SERVICE_HOST: joi.string().required(),
        KAFKA_SERVICE_HOST: joi.string().required(),
        KAFKA_SERVICE_PORT: joi.number().required(),
        VIEWS_AGGREGATOR_CLIENT_ID: joi.string().required(),
        VIEWS_AGGREGATOR_CONSUMER_ID: joi.string().required(),
      }),
    }),
  ],
  exports: [AppConfigService],
})
export class AppConfigModule {}
