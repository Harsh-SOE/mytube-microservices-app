import { VideoFindQueryDto } from '@app/contracts/videos';

export class QueryVideo {
  constructor(public readonly videoFindDto: VideoFindQueryDto) {}
}
