import { VideoLikeActionDto } from '@app/contracts/likes';

export class UnlikeCommand {
  public constructor(public readonly videoLikeDto: VideoLikeActionDto) {}
}
