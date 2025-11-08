import { Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import winston from 'winston';

import {
  VideoCreateDto,
  VideoFindDto,
  VideoFoundResponse,
  VideoPublishedResponse,
  VideosFoundResponse,
  VideoUpdatedResponse,
  VideoUpdateDto,
} from '@app/contracts/videos';
import { WINSTON_LOGGER } from '@app/clients';

import {
  EditVideoCommand,
  PublishVideoCommand,
} from '@videos/application/commands';
import { FindVideoQuery } from '@videos/application/queries';

@Injectable()
export class GrpcService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(WINSTON_LOGGER) private readonly logger: winston.Logger,
  ) {}

  async create(
    videoCreateDto: VideoCreateDto,
  ): Promise<VideoPublishedResponse> {
    this.logger.log(
      'info',
      `VIDEOS::CREATE_VIDEO:: Request recieved: ${JSON.stringify(videoCreateDto)}`,
    );

    return await this.commandBus.execute<
      PublishVideoCommand,
      VideoPublishedResponse
    >(new PublishVideoCommand(videoCreateDto));
  }

  findAll(): Promise<VideosFoundResponse> {
    throw new NotImplementedException(`findAll is not implemented`);
  }

  findOne(videoFindDto: VideoFindDto): Promise<VideoFoundResponse> {
    this.logger.log(
      'info',
      `VIDEOS::FIND_VIDEO:: Request recieved: ${JSON.stringify(videoFindDto)}`,
    );

    return this.queryBus.execute<FindVideoQuery, VideoFoundResponse>(
      new FindVideoQuery(videoFindDto),
    );
  }

  async update(videoUpdateDto: VideoUpdateDto): Promise<VideoUpdatedResponse> {
    this.logger.log(
      'info',
      `VIDEOS::UPDATE_VIDEO:: Request recieved: ${JSON.stringify(videoUpdateDto)}`,
    );

    return await this.commandBus.execute<
      EditVideoCommand,
      VideoUpdatedResponse
    >(new EditVideoCommand(videoUpdateDto));
  }

  remove(id: string): Promise<boolean> {
    throw new NotImplementedException(
      `remove with id:${id} is not implemented`,
    );
  }
}
