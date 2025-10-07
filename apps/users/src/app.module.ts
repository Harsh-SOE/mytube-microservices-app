import { Module } from '@nestjs/common';

import { PersistanceModule } from './infrastructure/persistance';
import { LogsModule } from '@users/infrastructure/logs';
import { MeasureModule } from '@users/infrastructure/measure';
import { AppConfigModule } from '@users/infrastructure/config';
import { UserModule } from './application/users/user.module';
import { MessageBrokerModule } from './infrastructure/message-broker/message-broker.module';
import { AppHealthModule } from './infrastructure/health/health.module';

@Module({
  imports: [
    UserModule,
    PersistanceModule,
    MeasureModule,
    LogsModule,
    AppConfigModule,
    MessageBrokerModule,
    AppHealthModule,
  ],
})
export class AppModule {}
