import { Module } from '@nestjs/common';

import { PersistanceModule } from './infrastructure/persistance';
import { LogsModule } from '@users/infrastructure/logs';
import { MeasureModule } from '@users/infrastructure/measure';
import { AppConfigModule } from '@users/config';
import { UserModule } from './application/users/user.module';

@Module({
  imports: [
    UserModule,
    PersistanceModule,
    MeasureModule,
    LogsModule,
    AppConfigModule,
  ],
})
export class AppModule {}
