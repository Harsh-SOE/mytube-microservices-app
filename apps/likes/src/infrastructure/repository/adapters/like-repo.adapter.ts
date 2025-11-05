import { Inject, Injectable } from '@nestjs/common';

import { DatabaseFilter } from '@app/infrastructure';

import {
  LikeRepositoryPort,
  LOGGER_PORT,
  LoggerPort,
} from '@likes/application/ports';
import { LikeAggregate } from '@likes/domain/aggregates';
import { LikeDomainStatus } from '@likes/domain/enums';
import { PersistanceService } from '@likes/infrastructure/persistance/adapter';
import { LikePersistanceACL } from '@likes/infrastructure/anti-corruption';
import { Components } from '@likes/infrastructure/config';

import { Prisma, VideoLikes } from '@peristance/likes';
import { LikeRepoFilter } from '../filters';

@Injectable()
export class LikeRepositoryAdapter implements LikeRepositoryPort {
  public constructor(
    private likePersistanceACL: LikePersistanceACL,
    private readonly likeRepoFilter: LikeRepoFilter,
    private persistanceService: PersistanceService,
    @Inject(LOGGER_PORT) private logger: LoggerPort,
  ) {}

  public toPrismaFilter(
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

  public async save(model: LikeAggregate): Promise<LikeAggregate> {
    const createdEntity = await this.persistanceService.videoLikes.create({
      data: this.likePersistanceACL.toPersistance(model),
    });
    return this.likePersistanceACL.toAggregate(createdEntity);
  }

  public async saveMany(models: LikeAggregate[]): Promise<number> {
    if (!models || models.length === 0) {
      return 0;
    }

    const dataToCreate = models.map((model) =>
      this.likePersistanceACL.toPersistance(model),
    );
    this.logger.info(
      `Saving: ${dataToCreate.length} documents into the database as a batch`,
      {
        component: Components.DATABASE,
        service: 'LIKE',
      },
    );
    const createdEntitiesFunc = async () =>
      await this.persistanceService.videoLikes.createMany({
        data: models.map((model) =>
          this.likePersistanceACL.toPersistance(model),
        ),
      });

    const createdEntities = await this.likeRepoFilter.filter(
      createdEntitiesFunc,
      { operationType: 'CREATE', entry: dataToCreate },
    );
    return createdEntities.count;
  }

  public async update(
    filter: DatabaseFilter<VideoLikes>,
    newLikeStatus: LikeDomainStatus,
  ): Promise<LikeAggregate> {
    const updateLikeOperation = async () =>
      await this.persistanceService.videoLikes.update({
        where: this.toPrismaFilter(
          filter,
          'unique',
        ) as Prisma.VideoLikesWhereUniqueInput,
        data: { likeStatus: newLikeStatus },
      });

    const updatedLike = await this.likeRepoFilter.filter(updateLikeOperation, {
      operationType: 'UPDATE',
      entry: {},
      filter: { newLikeStatus },
    });

    return this.likePersistanceACL.toAggregate(updatedLike);
  }

  public async updateMany(
    filter: DatabaseFilter<VideoLikes>,
    newLikeStatus: LikeDomainStatus,
  ): Promise<number> {
    const updatedLikesOperation = async () =>
      await this.persistanceService.videoLikes.updateMany({
        where: this.toPrismaFilter(
          filter,
          'many',
        ) as Prisma.VideoLikesWhereInput,
        data: { likeStatus: newLikeStatus },
      });

    const updatedLikes = await this.likeRepoFilter.filter(
      updatedLikesOperation,
      {
        operationType: 'UPDATE',
        entry: {},
        filter,
      },
    );

    return updatedLikes.count;
  }
}
