import { Module } from '@nestjs/common';

import { PersistanceModule } from './infrastructure/persistance';
import { LogsModule } from '@users/infrastructure/logs';
import { MeasureModule } from '@users/infrastructure/measure';
import { AppConfigModule } from '@users/infrastructure/config';

import { AppHealthModule } from './infrastructure/health';
import { UserModule } from './presentation/users';

@Module({
  imports: [
    UserModule,
    PersistanceModule,
    MeasureModule,
    LogsModule,
    AppConfigModule,
    AppHealthModule,
  ],
})
export class AppModule {}
