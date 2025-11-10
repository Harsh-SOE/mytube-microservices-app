import { Injectable } from '@nestjs/common';

import { LogExecutionTime } from '@app/utils';
import { UserNotFoundGrpcException } from '@app/errors';

import {
  DatabaseFilter,
  VideoQueryRepositoryPort,
} from '@videos/application/ports';
import { VideoQueryModel } from '@videos/application/queries/dto';
import { QueryModelResponseMapper } from '@videos/application/queries/adapter';
import { PersistanceService } from '@videos/infrastructure/persistance/adapter';

import { Prisma, Video } from '@peristance/videos';

import { UserRepoFilter } from '../../filters';

@Injectable()
export class VideoQueryRepositoryAdapter implements VideoQueryRepositoryPort {
  constructor(
    private readonly persistanceService: PersistanceService,
    private readonly videoQueryToResponseMapper: QueryModelResponseMapper,
    private readonly likeRepoFilter: UserRepoFilter,
  ) {}

  toPrismaFilter(
    filter: DatabaseFilter<Video>,
    mode: 'many' | 'unique',
  ): Prisma.VideoWhereInput | Prisma.VideoWhereUniqueInput {
    const prismaFilter: Prisma.VideoWhereInput | Prisma.VideoWhereUniqueInput =
      {};

    (Object.keys(filter) as Array<keyof Video>).forEach((key) => {
      const value = filter[key];
      if (value !== undefined) {
        prismaFilter[key as string] = value;
      }
    });

    if (mode === 'unique') return prismaFilter;

    if (filter.and) {
      prismaFilter.AND = filter.and.map((filterCondition) => ({
        [filterCondition.field]: {
          [filterCondition.operator]: [filterCondition.value],
        },
      }));
    }

    if (filter.or) {
      prismaFilter.OR = filter.or.map((filterCondition) => ({
        [filterCondition.field]: {
          [filterCondition.operator]: [filterCondition.value],
        },
      }));
    }

    if (filter.not) {
      prismaFilter.NOT = filter.not.map((filterCondition) => ({
        [filterCondition.field]: {
          [filterCondition.operator]: [filterCondition.value],
        },
      }));
    }

    return prismaFilter;
  }

  @LogExecutionTime()
  async findOne(filter: DatabaseFilter<Video>): Promise<VideoQueryModel> {
    const findVideoOperation = async () => {
      return await this.persistanceService.video.findUnique({
        where: this.toPrismaFilter(
          filter,
          'unique',
        ) as Prisma.VideoWhereUniqueInput,
      });
    };

    const foundVideo = await this.likeRepoFilter.filter(findVideoOperation, {
      operationType: 'CREATE',
      entry: {},
    });

    if (!foundVideo) {
      throw new UserNotFoundGrpcException(
        `Video with filter: ${JSON.stringify(filter)} was not found in the database`,
      );
    }

    return this.videoQueryToResponseMapper.toResponse(foundVideo);
  }

  async findMany(filter: DatabaseFilter<Video>): Promise<VideoQueryModel[]> {
    const findVideosOperation = async () => {
      return await this.persistanceService.video.findMany({
        where: this.toPrismaFilter(
          filter,
          'unique',
        ) as Prisma.VideoWhereUniqueInput,
      });
    };

    const foundVideos = await this.likeRepoFilter.filter(findVideosOperation, {
      operationType: 'CREATE',
      entry: {},
    });

    if (!foundVideos) {
      throw new UserNotFoundGrpcException(
        `Video with filter: ${JSON.stringify(filter)} was not found in the database`,
      );
    }

    return foundVideos.map((video) =>
      this.videoQueryToResponseMapper.toResponse(video),
    );
  }

  async findOneByid(id: string): Promise<VideoQueryModel> {
    const findVideoOperation = async () => {
      return await this.persistanceService.video.findUnique({
        where: { id },
      });
    };

    const foundVideo = await this.likeRepoFilter.filter(findVideoOperation, {
      operationType: 'CREATE',
      entry: {},
    });

    if (!foundVideo) {
      throw new UserNotFoundGrpcException(
        `Video with id: ${id} was not found in the database`,
      );
    }

    return this.videoQueryToResponseMapper.toResponse(foundVideo);
  }
}
