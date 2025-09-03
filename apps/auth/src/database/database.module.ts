import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AppConfigModule } from '../config/config.module';
import { AppConfigService } from '../config/config.service';

@Module({
  imports: [
    AppConfigModule,
    MongooseModule.forRootAsync({
      imports: [AppConfigModule],
      inject: [AppConfigService],
      useFactory: (configService: AppConfigService) => ({
        uri: configService.AUTH_DATABASE_URI,
        maxPoolSize: configService.DB_MAX_CONNECTIONS,
        minPoolSize: configService.DB_MIN_CONNECTIONS,
        maxIdleTimeMS: configService.DB_CONNECTION_IDLE_TIMEOUT,
      }),
    }),
  ],
})
export class DatabaseModule {}
