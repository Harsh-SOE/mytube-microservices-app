import { forwardRef, Inject, Injectable } from '@nestjs/common';

import { LogExecutionTime } from '@app/utils';
import { UserNotFoundGrpcException } from '@app/errors';

import {
  DatabaseFilter,
  VideoQueryRepositoryPort,
} from '@videos/application/ports';
import { VideoQueryModel } from '@videos/query';
import { PersistanceService } from '@videos/infrastructure/persistance/adapter';
import { VideoQueryPeristanceACL } from '@videos/infrastructure/anti-corruption';

import { Prisma, Video } from '@peristance/videos';

import { VideoRepoFilter } from '../../filters';

@Injectable()
export class VideoQueryRepositoryAdapter implements VideoQueryRepositoryPort {
  constructor(
    @Inject(forwardRef(() => VideoQueryPeristanceACL))
    private readonly videoQueryPersistanceACL: VideoQueryPeristanceACL,
    private readonly persistanceService: PersistanceService,
    private readonly videoRepoFilter: VideoRepoFilter,
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

    const foundVideo = await this.videoRepoFilter.filter(findVideoOperation, {
      operationType: 'CREATE',
      entry: {},
    });

    if (!foundVideo) {
      throw new UserNotFoundGrpcException(
        `Video with filter: ${JSON.stringify(filter)} was not found in the database`,
      );
    }

    return this.videoQueryPersistanceACL.toQueryModel(foundVideo);
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

    const foundVideos = await this.videoRepoFilter.filter(findVideosOperation, {
      operationType: 'CREATE',
      entry: {},
    });

    if (!foundVideos) {
      throw new UserNotFoundGrpcException(
        `Video with filter: ${JSON.stringify(filter)} was not found in the database`,
      );
    }

    return foundVideos.map((video) =>
      this.videoQueryPersistanceACL.toQueryModel(video),
    );
  }

  async findOneByid(id: string): Promise<VideoQueryModel> {
    const findVideoOperation = async () => {
      return await this.persistanceService.video.findUnique({
        where: { id },
      });
    };

    const foundVideo = await this.videoRepoFilter.filter(findVideoOperation, {
      operationType: 'CREATE',
      entry: {},
    });

    if (!foundVideo) {
      throw new UserNotFoundGrpcException(
        `Video with id: ${id} was not found in the database`,
      );
    }

    return this.videoQueryPersistanceACL.toQueryModel(foundVideo);
  }
}
