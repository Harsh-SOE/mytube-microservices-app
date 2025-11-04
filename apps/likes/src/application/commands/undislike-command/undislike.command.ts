import { VideoLikeActionDto } from '@app/contracts/likes';

export class UnDislikeCommand {
  constructor(public readonly videoLikeDto: VideoLikeActionDto) {}
}
