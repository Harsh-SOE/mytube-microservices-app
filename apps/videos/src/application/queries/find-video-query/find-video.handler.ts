import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { VideoFoundResponse } from '@app/contracts/videos';

import {
  DATABASE_QUERY_PORT,
  VideoQueryRepositoryPort,
} from '@videos/application/ports';
import {
  QueryToGrpcPublishEnumMapper,
  QueryToGrpcVisibilityEnumMapper,
} from '@videos/infrastructure/anti-corruption/enums/to-grpc';

import { FindVideoQuery } from './find-video.query';

@QueryHandler(FindVideoQuery)
export class FindVideoHandler implements IQueryHandler<FindVideoQuery> {
  constructor(
    @Inject(DATABASE_QUERY_PORT)
    private readonly video: VideoQueryRepositoryPort,
  ) {}

  async execute({ videoFindDto }: FindVideoQuery): Promise<VideoFoundResponse> {
    const { id } = videoFindDto;
    const video = await this.video.findOneByid(id);

    const videoPublishStatusForGrpc = QueryToGrpcPublishEnumMapper.get(
      video.videoPublishStatus,
    );
    const videoVisibilityStatusForGrpc = QueryToGrpcVisibilityEnumMapper.get(
      video.videoVisibilityStatus,
    );

    if (!videoPublishStatusForGrpc || !videoVisibilityStatusForGrpc) {
      throw new Error();
    }

    return {
      ...video,
      videoPublishStatus: videoPublishStatusForGrpc,
      videoVisibilityStatus: videoVisibilityStatusForGrpc,
    };
  }
}
