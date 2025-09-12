import { Module } from '@nestjs/common';

import { AuthModule } from './application/auth/auth.module';
import { AppConfigModule } from '@auth/config';
import { LogsModule } from '@auth/infrastructure/logs';
import { MeasureModule } from '@auth/infrastructure/measure';
import { OpenfgaModule } from '@auth/infrastructure/openfga';
import { PersistanceModule } from '@auth/infrastructure/persistance';

@Module({
  imports: [
    AuthModule,
    OpenfgaModule,
    AppConfigModule,
    LogsModule,
    MeasureModule,
    PersistanceModule,
  ],
})
export class AppModule {}
