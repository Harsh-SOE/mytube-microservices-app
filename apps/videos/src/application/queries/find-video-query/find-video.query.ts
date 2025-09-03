import { VideoFindDto } from '@app/contracts/videos';

export class FindVideoQuery {
  constructor(public readonly videoFindDto: VideoFindDto) {}
}
