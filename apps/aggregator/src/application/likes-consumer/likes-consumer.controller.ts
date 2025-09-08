import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { KafkaLikeMessage } from '@aggregator/types';

import { LikesConsumerService } from './likes-consumer.service';

@Controller()
export class LikesConsumerController {
  constructor(private likeConsumer: LikesConsumerService) {}

  @MessagePattern('video.like')
  async onLike(@Payload() message: KafkaLikeMessage) {
    console.log(`message is ${JSON.stringify(message)}`);
    return this.likeConsumer.onLike(message);
  }
}
