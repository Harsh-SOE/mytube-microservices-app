import { VideoLikeActionDto } from '@app/contracts/likes';

export class DislikeCommand {
  public constructor(public readonly videoLikeDto: VideoLikeActionDto) {}
}
