import { LikeDomainStatus } from '../../enum';
import { LikeStatus, UserId, VideoId } from '../../value-objects';

export class LikeEntity {
  public constructor(
    private readonly id: string,
    private readonly userId: UserId,
    private readonly videoId: VideoId,
    private likeStatus: LikeStatus,
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

  public getLikeStatus(): LikeDomainStatus {
    return this.likeStatus.getValue();
  }

  public getSnapshot() {
    return {
      id: this.id,
      userId: this.userId,
      videoId: this.videoId,
      likeStatus: this.likeStatus,
    };
  }

  public updateLikeStatus(newLikeStatus: string): LikeStatus {
    return LikeStatus.create(newLikeStatus);
  }
}
