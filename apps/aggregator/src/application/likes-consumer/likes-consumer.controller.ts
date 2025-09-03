import { Controller } from '@nestjs/common';
import { KafkaMessage } from '@nestjs/microservices/external/kafka.interface';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { KafkaLikeMessage } from '@aggregator/types';

import { LikesConsumerService } from './likes-consumer.service';

@Controller('likes-consumer')
export class LikesConsumerController {
  constructor(private likeConsumer: LikesConsumerService) {}

  @MessagePattern('video.like')
  async onLike(@Payload() message: KafkaMessage) {
    if (!message.value) {
      throw new Error(`No message payload was recieved`);
    }
    const likeMessage = JSON.parse(
      message.value.toString(),
    ) as KafkaLikeMessage;
    return this.likeConsumer.onLike(likeMessage);
  }
}
