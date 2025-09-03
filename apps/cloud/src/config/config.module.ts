import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';

import { AppConfigService } from './config.service';
import { join } from 'path';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(__dirname, '../../.env'),
      validationSchema: joi.object({
        HTTP_PORT: joi.number().required(),
        SERVICE_PORT: joi.number().required(),
        GRAFANA_LOKI_URL: joi.string().required(),
        AWS_REGION: joi.string().optional(),
        AWS_ACCESS_KEY: joi.string().optional(),
        AWS_ACCESS_SECRET: joi.string().optional(),
        AWS_BUCKET: joi.string().optional(),
        CLOUD_PROVIDER: joi.string().required(),
        CLOUDINARY_CLOUD_NAME: joi.string().optional(),
        CLOUDINARY_API_KEY: joi.string().optional(),
        CLOUDINARY_API_SECRET: joi.string().optional(),
        CLOUDINARY_UPLOAD_FOLDER: joi.string().optional(),
      }),
    }),
  ],
  providers: [AppConfigService],
  exports: [AppConfigService],
})
export class AppConfigModule {}
