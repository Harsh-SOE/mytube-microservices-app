import { VideoUpdateDto } from '@app/contracts/videos';

export class EditVideoCommand {
  constructor(public readonly updateVideoDto: VideoUpdateDto) {}
}
