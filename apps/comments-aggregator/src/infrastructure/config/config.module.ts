import { Global, Module } from '@nestjs/common';
import { AppConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../../.env',
      isGlobal: true,
      validationSchema: joi.object({
        COMMENTS_AGGREGATOR_CLIENT_ID: joi.string().required(),
        COMMENTS_AGGREGATOR_CONSUMER_GROUP_ID: joi.string().required(),
        KAFKA_SERVICE_HOST: joi.string().required(),
        KAFKA_SERVICE_PORT: joi.number().required(),
        HTTP_PORT: joi.number().required(),
        GRAFANA_LOKI_URL: joi.string().required(),
        CACHE_SERVICE_HOST: joi.string().required(),
        CACHE_SERVICE_PORT: joi.number().required(),
      }),
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
