import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { PersistanceModule } from './infrastructure/persistance/persistance.module';
import { LikesConsumerModule } from './application/likes-consumer/likes-consumer.module';

@Module({
  imports: [LikesConsumerModule, PersistanceModule, AppConfigModule],
})
export class AggregatorModule {}
