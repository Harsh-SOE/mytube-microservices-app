import { Inject } from '@nestjs/common';
import { ICommandHandler, QueryHandler } from '@nestjs/cqrs';

import { ChannelFoundResponse } from '@app/contracts/channel';

import {
  CHANNEL_QUERY_REPOSITORY,
  ChannelQueryRepositoryPort,
  LOGGER_PORT,
  LoggerPort,
} from '@channel/application/ports';

import { FindChannelByUserIdQuery } from './find-channel-by-id.query';

@QueryHandler(FindChannelByUserIdQuery)
export class FindChannelByUserIdQueryHandler
  implements ICommandHandler<FindChannelByUserIdQuery>
{
  public constructor(
    @Inject(CHANNEL_QUERY_REPOSITORY)
    private readonly channelRespository: ChannelQueryRepositoryPort,
    @Inject(LOGGER_PORT) private readonly logger: LoggerPort,
  ) {}

  async execute({
    findChannelByUserId: findChannelById,
  }: FindChannelByUserIdQuery): Promise<ChannelFoundResponse> {
    const { userId } = findChannelById;
    const channel = await this.channelRespository.findOne({ userId });

    this.logger.info(`Found channel is:`, channel || {});

    return {
      channel: channel
        ? {
            ...channel,
            bio: channel.bio ?? undefined,
            channelCoverImage: channel.ChannelCoverImage ?? undefined,
            isChannelMonitized: channel.isChannelMonitized ?? undefined,
            isChannelVerified: channel.isChannelVerified ?? undefined,
          }
        : undefined,
    };
  }
}
