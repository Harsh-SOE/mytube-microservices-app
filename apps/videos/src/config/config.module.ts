import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppConfigService } from './config.service';
import * as joi from 'joi';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../../.env'),
      isGlobal: true,
      validationSchema: joi.object({
        HTTP_PORT: joi.number().required(),
        SERVICE_PORT: joi.number().required(),
        GRAFANA_LOKI_URL: joi.string().required(),
        VIDEO_TRANSCODER_CLIENT_ID: joi.string().required(),
        VIDEO_TRANSCODER_CONSUMER_GROUP_ID: joi.string().required(),
        VIDEO_TRANSCODER_SERVICE_HOST: joi.string().required(),
        VIDEO_TRANSCODER_SERVICE_PORT: joi.number().required(),
        DB_USER: joi.string().required(),
        DB_PASSWORD: joi.string().required(),
        DB_NAME: joi.string().required(),
        DB_HOST: joi.string().required(),
        DB_PORT: joi.number().required(),
      }),
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
