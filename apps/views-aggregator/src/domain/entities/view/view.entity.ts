import { UserId, VideoId } from '@views-aggregator/domain/value-objects';

export class ViewEntity {
  public constructor(
    private readonly id: string,
    private readonly userId: UserId,
    private readonly videoId: VideoId,
  ) {}

  public getUserId(): string {
    return this.userId.getValue();
  }

  public getVideoId(): string {
    return this.videoId.getValue();
  }

  public getSnapshot() {
    return {
      id: this.id,
      userId: this.userId.getValue(),
      videoId: this.videoId.getValue(),
    };
  }
}
