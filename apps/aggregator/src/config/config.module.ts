import { Module } from '@nestjs/common';
import { AppConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import * as joi from 'joi';

@Module({
  providers: [AppConfigService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../../env'),
      isGlobal: true,
      validationSchema: joi.object({
        HTTP_PORT: joi.number().required(),
        KAFKA_SERVICE_HOST: joi.string().required(),
        KAFKA_SERVICE_PORT: joi.number().required(),
        AGGREGATOR_CLIENT_ID: joi.string().required(),
        AGGREGATOR_CONSUMER_ID: joi.string().required(),
      }),
    }),
  ],
})
export class AppConfigModule {}
