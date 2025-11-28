import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as joi from 'joi';
import path from 'path';

import { AppConfigService } from './config.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: path.join(__dirname, '../../.env'),
      validationSchema: {
        HTTP_PORT: joi.string().required(),
        GRPC_PORT: joi.string().required(),
      },
    }),
  ],
  providers: [AppConfigService],
})
export class AppConfigModule {}
