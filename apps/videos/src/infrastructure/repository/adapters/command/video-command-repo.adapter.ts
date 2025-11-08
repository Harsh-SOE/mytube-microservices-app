import { Inject, Injectable } from '@nestjs/common';

import { UserNotFoundGrpcException } from '@app/errors';

import {
  LOGGER_PORT,
  LoggerPort,
  DatabaseFilter,
  VideoCommandRepositoryPort,
} from '@videos/application/ports';
import { VideoAggregate } from '@videos/domain/aggregates';
import {
  VideoDomainPublishStatus,
  VideoDomainVisibiltyStatus,
} from '@videos/domain/enums';
import { PersistanceService } from '@videos/infrastructure/persistance/adapter';
import { VideoAggregatePersistanceACL } from '@videos/infrastructure/anti-corruption';
import { Components } from '@videos/infrastructure/config';

import { Prisma, Video } from '@peristance/videos';

import { VideoRepoFilter } from '../../filters';

@Injectable()
export class VideoCommandRepositoryAdapter
  implements VideoCommandRepositoryPort
{
  public constructor(
    private videoPersistanceACL: VideoAggregatePersistanceACL,
    private readonly videoRepoFilter: VideoRepoFilter,
    private persistanceService: PersistanceService,
    @Inject(LOGGER_PORT) private logger: LoggerPort,
  ) {}

  public toPrismaFilter(
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

  public async save(model: VideoAggregate): Promise<VideoAggregate> {
    const createdEntityFunc = async () =>
      await this.persistanceService.video.create({
        data: this.videoPersistanceACL.toPersistance(model),
      });
    const createdEntity = await this.videoRepoFilter.filter(createdEntityFunc, {
      operationType: 'CREATE',
      entry: this.videoPersistanceACL.toPersistance(model),
    });
    return this.videoPersistanceACL.toAggregate(createdEntity);
  }

  public async saveMany(models: VideoAggregate[]): Promise<number> {
    if (!models || models.length === 0) {
      return 0;
    }

    const dataToCreate = models.map((model) =>
      this.videoPersistanceACL.toPersistance(model),
    );
    this.logger.info(
      `Saving: ${dataToCreate.length} documents into the database as a batch`,
      {
        component: Components.DATABASE,
        service: 'LIKE',
      },
    );
    const createdEntitiesFunc = async () =>
      await this.persistanceService.video.createMany({
        data: models.map((model) =>
          this.videoPersistanceACL.toPersistance(model),
        ),
      });

    const createdEntities = await this.videoRepoFilter.filter(
      createdEntitiesFunc,
      { operationType: 'CREATE', entry: dataToCreate },
    );
    return createdEntities.count;
  }

  public async updatePublishStatus(
    filter: DatabaseFilter<Video>,
    newPublishStatus: VideoDomainPublishStatus,
  ): Promise<VideoAggregate> {
    const updateLikeOperation = async () =>
      await this.persistanceService.video.update({
        where: this.toPrismaFilter(
          filter,
          'unique',
        ) as Prisma.VideoWhereUniqueInput,
        data: { videoPublishStatus: newPublishStatus },
      });

    const updatedLike = await this.videoRepoFilter.filter(updateLikeOperation, {
      operationType: 'UPDATE',
      entry: {},
      filter: { newPublishStatus },
    });

    return this.videoPersistanceACL.toAggregate(updatedLike);
  }

  public async updateVisibilityStatus(
    filter: DatabaseFilter<Video>,
    newVisibilityStatus: VideoDomainVisibiltyStatus,
  ): Promise<VideoAggregate> {
    const updateLikeOperation = async () =>
      await this.persistanceService.video.update({
        where: this.toPrismaFilter(
          filter,
          'unique',
        ) as Prisma.VideoWhereUniqueInput,
        data: { videoVisibiltyStatus: newVisibilityStatus },
      });

    const updatedLike = await this.videoRepoFilter.filter(updateLikeOperation, {
      operationType: 'UPDATE',
      entry: {},
      filter: { newVisibilityStatus: newVisibilityStatus },
    });

    return this.videoPersistanceACL.toAggregate(updatedLike);
  }

  public async updateMany(
    filter: DatabaseFilter<Video>,
    newVideoModel: VideoAggregate,
  ): Promise<number> {
    const updatedLikesOperation = async () =>
      await this.persistanceService.video.updateMany({
        where: this.toPrismaFilter(filter, 'many') as Prisma.VideoWhereInput,
        data: {
          id: newVideoModel.getVideo().getId(),
          ownerId: newVideoModel.getVideo().getOwnerId(),
          videoFileUrl: newVideoModel.getVideo().getVideoUrl(),
          description: newVideoModel.getVideo().getDescription(),
          videoPublishStatus: newVideoModel.getVideo().getPublishStatus(),
          videoVisibiltyStatus: newVideoModel.getVideo().getVisibiltyStatus(),
          title: newVideoModel.getVideo().getTitle(),
        },
      });

    const updatedLikes = await this.videoRepoFilter.filter(
      updatedLikesOperation,
      {
        operationType: 'UPDATE',
        entry: {},
        filter,
      },
    );

    return updatedLikes.count;
  }

  async findOneById(id: string): Promise<VideoAggregate> {
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

    return this.videoPersistanceACL.toAggregate(foundVideo);
  }

  public async updateOne(
    filter: DatabaseFilter<Video>,
    newVideoModel: VideoAggregate,
  ): Promise<VideoAggregate> {
    const updatedLikesOperation = async () =>
      await this.persistanceService.video.update({
        where: this.toPrismaFilter(
          filter,
          'unique',
        ) as Prisma.VideoWhereUniqueInput,
        data: {
          id: newVideoModel.getVideo().getId(),
          ownerId: newVideoModel.getVideo().getOwnerId(),
          videoFileUrl: newVideoModel.getVideo().getVideoUrl(),
          description: newVideoModel.getVideo().getDescription(),
          videoPublishStatus: newVideoModel.getVideo().getPublishStatus(),
          videoVisibiltyStatus: newVideoModel.getVideo().getVisibiltyStatus(),
          title: newVideoModel.getVideo().getTitle(),
        },
      });

    const updatedVideo = await this.videoRepoFilter.filter(
      updatedLikesOperation,
      {
        operationType: 'UPDATE',
        entry: {},
        filter,
      },
    );

    return this.videoPersistanceACL.toAggregate(updatedVideo);
  }

  async updateOneById(
    id: string,
    newVideoModel: VideoAggregate,
  ): Promise<VideoAggregate> {
    const updatedLikesOperation = async () =>
      await this.persistanceService.video.update({
        where: this.toPrismaFilter(
          { id },
          'unique',
        ) as Prisma.VideoWhereUniqueInput,
        data: {
          id: newVideoModel.getVideo().getId(),
          ownerId: newVideoModel.getVideo().getOwnerId(),
          videoFileUrl: newVideoModel.getVideo().getVideoUrl(),
          description: newVideoModel.getVideo().getDescription(),
          videoPublishStatus: newVideoModel.getVideo().getPublishStatus(),
          videoVisibiltyStatus: newVideoModel.getVideo().getVisibiltyStatus(),
          title: newVideoModel.getVideo().getTitle(),
        },
      });

    const updatedVideo = await this.videoRepoFilter.filter(
      updatedLikesOperation,
      {
        operationType: 'UPDATE',
        entry: {},
        filter: { id },
      },
    );

    return this.videoPersistanceACL.toAggregate(updatedVideo);
  }
}
