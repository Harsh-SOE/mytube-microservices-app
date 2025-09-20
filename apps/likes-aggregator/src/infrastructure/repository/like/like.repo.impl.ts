import { Inject, Injectable } from '@nestjs/common';
import winston from 'winston';

import {
  DatabaseFilter,
  handlePrismaPersistanceOperation,
} from '@app/infrastructure';

import { LikeAggregate } from '@likes-aggregator/domain/aggregates';
import { LikeDomainStatus } from '@likes-aggregator/domain/domain-enums';
import { PersistanceService } from '@likes-aggregator/infrastructure/persistance/persistance.service';
import { LikePersistanceACL } from '@likes-aggregator/infrastructure/anti-corruption/like-persistance.acl';

import { Prisma, VideoLikes } from '@peristance/likes-aggregator';

import { WINSTON_LOGGER } from '@app/clients';

import { ILikeRepository } from './like.repo';

@Injectable()
export class LikeRepository
  implements ILikeRepository<LikeAggregate, DatabaseFilter<VideoLikes>>
{
  constructor(
    private persistanceService: PersistanceService,
    private likePersistanceACL: LikePersistanceACL,
    @Inject(WINSTON_LOGGER) private readonly logger: winston.Logger,
  ) {}

  toPrismaFilter(
    filter: DatabaseFilter<VideoLikes>,
    mode: 'many' | 'unique',
  ): Prisma.VideoLikesWhereInput | Prisma.VideoLikesWhereUniqueInput {
    const prismaFilter:
      | Prisma.VideoLikesWhereInput
      | Prisma.VideoLikesWhereUniqueInput = {};

    (Object.keys(filter) as Array<keyof VideoLikes>).forEach((key) => {
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

  async interactVideo(model: LikeAggregate): Promise<LikeAggregate> {
    const createdEntity = await this.persistanceService.videoLikes.create({
      data: this.likePersistanceACL.toPersistance(model),
    });
    return this.likePersistanceACL.toEntity(createdEntity);
  }

  async interactManyVideos(models: LikeAggregate[]): Promise<number> {
    // 1. Handle empty input to prevent unnecessary database calls.
    if (!models || models.length === 0) {
      return 0;
    }

    // 2. Map the data *once* and store it in a constant.
    const dataToCreate = models.map((model) =>
      this.likePersistanceACL.toPersistance(model),
    );
    this.logger.log(
      'database',
      `Saving: ${dataToCreate.length} documents into the database as a batch`,
    );
    const createdEntitiesFunc = async () =>
      await this.persistanceService.videoLikes.createMany({
        data: models.map((model) =>
          this.likePersistanceACL.toPersistance(model),
        ),
      });

    const createdEntities =
      await handlePrismaPersistanceOperation(createdEntitiesFunc);
    return createdEntities.count;
  }

  async changeLikeStatus(
    filter: DatabaseFilter<VideoLikes>,
    newLikeStatus: LikeDomainStatus,
  ): Promise<LikeAggregate> {
    const updatedLike = await this.persistanceService.videoLikes.update({
      where: this.toPrismaFilter(
        filter,
        'unique',
      ) as Prisma.VideoLikesWhereUniqueInput,
      data: { likeStatus: newLikeStatus },
    });
    return this.likePersistanceACL.toEntity(updatedLike);
  }

  async changeManyLikeStatus(
    filter: DatabaseFilter<VideoLikes>,
    newLikeStatus: LikeDomainStatus,
  ): Promise<number> {
    const updatedLikes = await this.persistanceService.videoLikes.updateMany({
      where: this.toPrismaFilter(filter, 'many') as Prisma.VideoLikesWhereInput,
      data: { likeStatus: newLikeStatus },
    });

    return updatedLikes.count;
  }
}
