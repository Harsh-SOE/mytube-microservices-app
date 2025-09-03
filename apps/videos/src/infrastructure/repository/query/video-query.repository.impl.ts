import { Injectable } from '@nestjs/common';

import { LogExecutionTime } from '@app/utils';
import { UserNotFoundGrpcException } from '@app/errors';
import {
  DatabaseFilter,
  handlePrismaPersistanceOperation,
  IQueryRepository,
} from '@app/infrastructure';

import { Prisma, Video } from '@peristance/videos';

import { VideoQueryModel } from '@videos/application/queries/dto';
import { PersistanceService } from '@videos/infrastructure/persistance';
import { QueryModelResponseMapper } from '@videos/application/queries/adapter';

@Injectable()
export class VideoQueryRepository
  implements IQueryRepository<DatabaseFilter<Video>, VideoQueryModel>
{
  constructor(
    private readonly persistanceService: PersistanceService,
    private readonly videoQueryToResponseMapper: QueryModelResponseMapper,
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
    const findUserOperation = async () => {
      return await this.persistanceService.video.findUnique({
        where: this.toPrismaFilter(
          filter,
          'unique',
        ) as Prisma.VideoWhereUniqueInput,
      });
    };

    const foundVideo =
      await handlePrismaPersistanceOperation(findUserOperation);

    if (!foundVideo) {
      throw new UserNotFoundGrpcException(
        `User with filter: ${JSON.stringify(filter)} was not found in the database`,
      );
    }
    return this.videoQueryToResponseMapper.toResponse(foundVideo);
  }

  async findMany(filter: DatabaseFilter<Video>): Promise<VideoQueryModel[]> {
    const findUsersOperation = async () => {
      return await this.persistanceService.video.findMany({
        where: this.toPrismaFilter(filter, 'many') as Prisma.VideoWhereInput,
      });
    };
    const foundVideos =
      await handlePrismaPersistanceOperation(findUsersOperation);
    return foundVideos.map((video) =>
      this.videoQueryToResponseMapper.toResponse(video),
    );
  }

  async findOneByid(id: string): Promise<VideoQueryModel> {
    const findUserOperation = async () => {
      return await this.persistanceService.video.findUnique({
        where: { id },
      });
    };

    const foundVideo =
      await handlePrismaPersistanceOperation(findUserOperation);
    if (!foundVideo) {
      throw new UserNotFoundGrpcException(
        `User with id${id} was not found in the database`,
      );
    }
    return this.videoQueryToResponseMapper.toResponse(foundVideo);
  }
}
