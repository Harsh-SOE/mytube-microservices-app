import { Injectable } from '@nestjs/common';

import { LogExecutionTime } from '@app/utils';
import {
  DatabaseFilter,
  handlePrismaPersistanceOperation,
  ICommandRepository,
} from '@app/infrastructure';

import { VideoAggregate } from '@videos/domain/aggregates';
import { PersistanceService } from '@videos/infrastructure/persistance';
import { VideoAggregatePersistanceACL } from '@videos/infrastructure/anti-corruption';
import { VideoNotFoundGrpcException } from '@videos/errors';

import { Prisma, Video } from '@peristance/videos';

@Injectable()
export class VideoCommandRepository
  implements ICommandRepository<VideoAggregate, Video>
{
  public constructor(
    private readonly videoEntityPeristanceACL: VideoAggregatePersistanceACL,
    private readonly peristanceService: PersistanceService,
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
  public async createOne(domain: VideoAggregate): Promise<VideoAggregate> {
    const createdEntityOperation = async () => {
      return await this.peristanceService.video.create({
        data: {
          ...this.videoEntityPeristanceACL.toPersistance(domain),
        },
      });
    };

    const createdEntity = await handlePrismaPersistanceOperation(
      createdEntityOperation,
    );
    return this.videoEntityPeristanceACL.toEntity(createdEntity);
  }

  @LogExecutionTime()
  async createMany(domains: VideoAggregate[]): Promise<number> {
    const createdVideosCount = await this.peristanceService.video.createMany({
      data: domains.map((domain) =>
        this.videoEntityPeristanceACL.toPersistance(domain),
      ),
    });
    return createdVideosCount.count;
  }

  @LogExecutionTime()
  public async updateOne(
    filter: DatabaseFilter<Video>,
    updatedDomain: VideoAggregate,
  ): Promise<VideoAggregate> {
    const updateDomainOperation = async () => {
      return await this.peristanceService.video.update({
        where: this.toPrismaFilter(
          filter,
          'unique',
        ) as Prisma.VideoWhereUniqueInput,
        data: this.videoEntityPeristanceACL.toPersistance(updatedDomain),
      });
    };
    const updatedDomainResult = await handlePrismaPersistanceOperation(
      updateDomainOperation,
    );
    return this.videoEntityPeristanceACL.toEntity(updatedDomainResult);
  }

  @LogExecutionTime()
  public async updateOneById(
    id: string,
    updatedDomain: VideoAggregate,
  ): Promise<VideoAggregate> {
    const updateDomainOperation = async () => {
      return await this.peristanceService.video.update({
        where: { id },
        data: this.videoEntityPeristanceACL.toPersistance(updatedDomain),
      });
    };
    const updatedDomainResult = await handlePrismaPersistanceOperation(
      updateDomainOperation,
    );
    return this.videoEntityPeristanceACL.toEntity(updatedDomainResult);
  }

  @LogExecutionTime()
  public async updateMany(
    filter: DatabaseFilter<Video>,
    updatedDomain: VideoAggregate,
  ): Promise<VideoAggregate[]> {
    const updateEntitiesOperation = async () => {
      return await this.peristanceService.video.updateMany({
        where: this.toPrismaFilter(filter, 'many') as Prisma.VideoWhereInput,
        data: this.videoEntityPeristanceACL.toPersistance(updatedDomain),
      });
    };

    const updatedEntitiesResult = await handlePrismaPersistanceOperation(
      updateEntitiesOperation,
    );
    if (!updatedEntitiesResult.count) {
      throw new VideoNotFoundGrpcException(
        `No videos with filter: ${JSON.stringify(filter)} were found in the database`,
      );
    }
    return (await this.peristanceService.video.findMany({ where: filter })).map(
      (video) => this.videoEntityPeristanceACL.toEntity(video),
    );
  }

  @LogExecutionTime()
  public async deleteOne(filter: DatabaseFilter<Video>): Promise<boolean> {
    const deleteEntityOperation = async () => {
      return await this.peristanceService.video.delete({
        where: this.toPrismaFilter(
          filter,
          'unique',
        ) as Prisma.VideoWhereUniqueInput,
      });
    };
    const deletedEntity = await handlePrismaPersistanceOperation(
      deleteEntityOperation,
    );
    return deletedEntity ? true : false;
  }

  @LogExecutionTime()
  async deleteOnebyId(id: string): Promise<boolean> {
    const deleteEntityOperation = async () => {
      return await this.peristanceService.video.delete({
        where: { id },
      });
    };
    const deletedEntity = await handlePrismaPersistanceOperation(
      deleteEntityOperation,
    );
    return deletedEntity ? true : false;
  }

  @LogExecutionTime()
  public async deleteMany(filter: DatabaseFilter<Video>): Promise<boolean> {
    const deleteEntityOperation = async () => {
      return await this.peristanceService.video.deleteMany({
        where: this.toPrismaFilter(filter, 'many') as Prisma.VideoWhereInput,
      });
    };
    const deletedEntityResponse = await handlePrismaPersistanceOperation(
      deleteEntityOperation,
    );
    if (!deletedEntityResponse.count)
      throw new VideoNotFoundGrpcException(
        `Video with filter: ${JSON.stringify(filter)} was not found in the database`,
      );
    return true;
  }

  @LogExecutionTime()
  public async findOneById(id: string): Promise<VideoAggregate> {
    const findUserOperation = async () => {
      return await this.peristanceService.video.findUnique({
        where: { id },
      });
    };

    const foundUser = await handlePrismaPersistanceOperation(findUserOperation);
    if (!foundUser) {
      throw new VideoNotFoundGrpcException(
        `Video with id:${id} was not found in the database`,
      );
    }
    return this.videoEntityPeristanceACL.toEntity(foundUser);
  }
}
