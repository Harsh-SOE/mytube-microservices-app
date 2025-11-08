import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';

import { ViewsVideoResponse } from '@app/contracts/views';

import {
  BUFFER_PORT,
  BufferPort,
  CACHE_PORT,
  ViewCachePort,
} from '@views/application/ports';
import { ViewAggregate } from '@views/domain/aggregates';

import { WatchVideoCommand } from './watch-video.command';

@CommandHandler(WatchVideoCommand)
export class WatchVideoHandler
  implements ICommandHandler<WatchVideoCommand, ViewsVideoResponse>
{
  public constructor(
    @Inject(CACHE_PORT) private readonly cacheAdapter: ViewCachePort,
    @Inject(BUFFER_PORT) private readonly bufferAdapter: BufferPort,
  ) {}

  public async execute({
    watchVideoDto,
  }: WatchVideoCommand): Promise<ViewsVideoResponse> {
    const { userId, videoId } = watchVideoDto;
    const viewAggregate = ViewAggregate.create(userId, videoId);

    const result = await this.cacheAdapter.recordView(videoId, userId);

    if (result === 0) {
      return { response: 'video already watched' };
    }

    await this.bufferAdapter.bufferView(viewAggregate);

    return { response: 'video watched successfully' };
  }
}
