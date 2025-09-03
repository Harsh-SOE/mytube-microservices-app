import { LikeAggregate } from '@aggregator/domain/aggregates';
import { ILikeRepository } from './like.repo';
import { PersistanceService } from '@aggregator/infrastructure/persistance/persistance.service';
import { LikePersistanceACL } from '@aggregator/infrastructure/anti-corruption/like-persistance.acl';
import { DatabaseFilter } from '@app/infrastructure';
import { Prisma, VideoLikes } from '@peristance/aggregator';
import { LikeDomainStatus } from '@aggregator/domain/domain-enums';

export class LikeRepository
  implements ILikeRepository<LikeAggregate, DatabaseFilter<VideoLikes>>
{
  constructor(
    private persistanceService: PersistanceService,
    private likePersistanceACL: LikePersistanceACL,
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
    const createdEntities = await this.persistanceService.videoLikes.createMany(
      {
        data: models.map((model) =>
          this.likePersistanceACL.toPersistance(model),
        ),
      },
    );
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
