import { Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';

import {
  GetPresignedUrlDto,
  GetPreSignedUrlResponse,
  VideoCreateDto,
  VideoFindDto,
  VideoFoundResponse,
  VideoPublishedResponse,
  VideosFoundResponse,
  VideoUpdatedResponse,
  VideoUpdateDto,
} from '@app/contracts/videos';

import {
  EditVideoCommand,
  PublishVideoCommand,
  GeneratePreSignedUrlCommand,
} from '@videos/application/commands';
import { FindVideoQuery } from '@videos/application/queries';
import { LOGGER_PORT, LoggerPort } from '@videos/application/ports';

@Injectable()
export class GrpcService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(LOGGER_PORT) private readonly logger: LoggerPort,
  ) {}

  async generatePreSignedUrl(
    getPresignedUrlDto: GetPresignedUrlDto,
  ): Promise<GetPreSignedUrlResponse> {
    return this.commandBus.execute<
      GeneratePreSignedUrlCommand,
      GetPreSignedUrlResponse
    >(new GeneratePreSignedUrlCommand(getPresignedUrlDto));
  }

  async create(
    videoCreateDto: VideoCreateDto,
  ): Promise<VideoPublishedResponse> {
    return await this.commandBus.execute<
      PublishVideoCommand,
      VideoPublishedResponse
    >(new PublishVideoCommand(videoCreateDto));
  }

  findAll(): Promise<VideosFoundResponse> {
    throw new NotImplementedException(`findAll is not implemented`);
  }

  findOne(videoFindDto: VideoFindDto): Promise<VideoFoundResponse> {
    return this.queryBus.execute<FindVideoQuery, VideoFoundResponse>(
      new FindVideoQuery(videoFindDto),
    );
  }

  async update(videoUpdateDto: VideoUpdateDto): Promise<VideoUpdatedResponse> {
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
