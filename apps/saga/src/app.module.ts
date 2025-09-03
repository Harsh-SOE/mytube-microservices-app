import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { SagaModule } from './saga/saga.module';
import { LogsModule } from './logs/logs.module';

@Module({
  imports: [AppConfigModule, SagaModule, LogsModule],
})
export class AppModule {}
