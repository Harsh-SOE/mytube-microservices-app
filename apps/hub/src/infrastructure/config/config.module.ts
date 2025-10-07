import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import { join } from 'path';

import { AppConfigService } from './config.service';

@Module({
  providers: [AppConfigService],
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '../../.env'),
      isGlobal: true,
      validationSchema: joi.object({
        SERVICE_PORT: joi.number().required(),
        HTTP_PORT: joi.number().required(),
        DATABASE_URL: joi.string().required(),
      }),
    }),
  ],
})
export class AppConfigModule {}
