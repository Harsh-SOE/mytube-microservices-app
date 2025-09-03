import { Module } from '@nestjs/common';
import { LikesConsumerService } from './likes-consumer.service';
import { LikesConsumerController } from './likes-consumer.controller';

@Module({
  providers: [LikesConsumerService],
  controllers: [LikesConsumerController],
})
export class LikesConsumerModule {}
