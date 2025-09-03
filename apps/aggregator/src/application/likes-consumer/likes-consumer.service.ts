import { Injectable } from '@nestjs/common';

import { LikeAggregateFactory } from '@aggregator/domain/factories';
import { LikeRepository } from '@aggregator/infrastructure/repository';
import { KafkaLikeMessage } from '@aggregator/types';

const pending = new Set<KafkaLikeMessage>();
let lastFlush = Date.now();

@Injectable()
export class LikesConsumerService {
  public constructor(
    private likeRepo: LikeRepository,
    private likeAggregateFactory: LikeAggregateFactory,
  ) {}

  private async flush() {
    const messages = Array.from(pending.values());
    pending.clear();
    lastFlush = Date.now();

    const models = messages.map((message) => {
      const { id, likeStatus, userId, videoId } = message;
      return this.likeAggregateFactory.create(id, userId, videoId, likeStatus);
    });

    const likesNum = await this.likeRepo.interactManyVideos(models);
    console.log(`Likes saved: ${likesNum}`);
  }

  async onLike(message: KafkaLikeMessage) {
    pending.add(message);
    const due = pending.size >= 500 || Date.now() - lastFlush > 2000;
    if (due) await this.flush();
  }
}
