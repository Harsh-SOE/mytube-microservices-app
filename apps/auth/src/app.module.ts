import { Module } from '@nestjs/common';

import { AuthModule } from './auth/auth.module';
import { OpenfgaModule } from './openfga/openfga.module';
import { AppConfigModule } from './config/config.module';
import { LogsModule } from './logs/logs.module';
import { MeasureModule } from './measure/measure.module';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [
    AuthModule,
    OpenfgaModule,
    AppConfigModule,
    LogsModule,
    MeasureModule,
    DatabaseModule,
  ],
})
export class AppModule {}
