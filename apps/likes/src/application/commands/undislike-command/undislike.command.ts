import { VideoLikeActionDto } from '@app/contracts/likes';

export class UnDislikeCommand {
  public constructor(public readonly videoLikeDto: VideoLikeActionDto) {}
}
