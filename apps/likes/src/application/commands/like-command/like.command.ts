import { VideoLikeActionDto } from '@app/contracts/likes';

export class LikeCommand {
  public constructor(public readonly videoLikeDto: VideoLikeActionDto) {}
}
