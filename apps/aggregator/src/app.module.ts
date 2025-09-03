import { Module } from '@nestjs/common';
import { AppConfigModule } from './config/config.module';
import { PersistanceModule } from './infrastructure/persistance/persistance.module';
import { LikesConsumerModule } from './application/likes-consumer/likes-consumer.module';
import { LikesConsumerService } from './application/likes-consumer/likes-consumer.service';
import { LikesConsumerController } from './application/likes-consumer/likes-consumer.controller';

@Module({
  imports: [AppConfigModule, PersistanceModule, LikesConsumerModule],
  providers: [LikesConsumerService],
  controllers: [LikesConsumerController],
})
export class AggregatorModule {}
