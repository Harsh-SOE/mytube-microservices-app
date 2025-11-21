import { ReactionStatus, UserId, VideoId } from '../../value-objects';
import { ReactionDomainStatus } from '../../enums';

export class ReactionEntity {
  public constructor(
    private readonly id: string,
    private readonly userId: UserId,
    private readonly videoId: VideoId,
    private readonly reactionStatus: ReactionStatus,
  ) {}

  public getId(): string {
    return this.id;
  }

  public getUserId(): string {
    return this.userId.getValue();
  }

  public getVideoId(): string {
    return this.videoId.getValue();
  }

  public getReactionStatus(): ReactionDomainStatus {
    return this.reactionStatus.getValue();
  }

  public getSnapshot() {
    return {
      id: this.id,
      userId: this.userId,
      videoId: this.videoId,
      reactionStatus: this.reactionStatus,
    };
  }

  public updateReactionStatus(newReactionStatus: string): ReactionStatus {
    return ReactionStatus.create(newReactionStatus);
  }
}
