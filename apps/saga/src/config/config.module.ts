import { Module } from '@nestjs/common';
import { AppConfigService } from './config.service';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import { join } from 'path';

@Module({
  providers: [AppConfigService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../../.env'),
      isGlobal: true,
      validationSchema: joi.object({
        SERVICE_PORT: joi.number().required(),
        HTTP_PORT: joi.number().required(),
        GRAFANA_LOKI_URL: joi.string().required(),
        USER_SERVICE_PORT: joi.number().required(),
        USER_SERVICE_HOST: joi.string().required(),
        AUTH_SERVICE_PORT: joi.number().required(),
        AUTH_SERVICE_HOST: joi.string().required(),
      }),
    }),
  ],
  exports: [AppConfigService],
})
export class AppConfigModule {}
