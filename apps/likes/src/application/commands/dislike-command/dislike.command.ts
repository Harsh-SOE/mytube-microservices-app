import { VideoLikeActionDto } from '@app/contracts/likes';

export class DislikeCommand {
  constructor(public readonly videoLikeDto: VideoLikeActionDto) {}
}
