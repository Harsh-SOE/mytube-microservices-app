import { VideoLikeActionDto } from '@app/contracts/likes';

export class UnlikeCommand {
  constructor(public readonly videoLikeDto: VideoLikeActionDto) {}
}
