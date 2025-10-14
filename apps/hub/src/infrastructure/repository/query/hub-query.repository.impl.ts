import { Injectable } from '@nestjs/common';

import { LogExecutionTime } from '@app/utils';
import { UserNotFoundGrpcException } from '@app/errors';
import {
  DatabaseFilter,
  handlePrismaPersistanceOperation,
} from '@app/infrastructure';

import { Prisma, Hub } from '@peristance/hub';

import { HubQueryModel } from '@hub/application/query';
import { PersistanceService } from '@hub/infrastructure/persistance';
import { HubQueryRepositoryPort } from '@hub/application/ports';

@Injectable()
export class HubQueryRepository implements HubQueryRepositoryPort {
  constructor(private readonly persistanceService: PersistanceService) {}

  toPrismaFilter(
    filter: DatabaseFilter<Hub>,
    mode: 'many' | 'unique',
  ): Prisma.HubWhereInput | Prisma.HubWhereUniqueInput {
    const prismaFilter: Prisma.HubWhereInput | Prisma.HubWhereUniqueInput = {};

    (Object.keys(filter) as Array<keyof Hub>).forEach((key) => {
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
  async findById(id: string): Promise<HubQueryModel> {
    const findVideoChannelOperation = async () => {
      return await this.persistanceService.hub.findUnique({
        where: { id },
      });
    };

    const foundChannel = await handlePrismaPersistanceOperation(
      findVideoChannelOperation,
    );
    if (!foundChannel) {
      throw new UserNotFoundGrpcException(
        `Channel with id${id} was not found in the database`,
      );
    }
    return foundChannel;
  }

  @LogExecutionTime()
  async findOne(filter: DatabaseFilter<Hub>): Promise<HubQueryModel> {
    const findVideoChannelOperation = async () => {
      return await this.persistanceService.hub.findUnique({
        where: this.toPrismaFilter(
          filter,
          'unique',
        ) as Prisma.HubWhereUniqueInput,
      });
    };

    const foundChannel = await handlePrismaPersistanceOperation(
      findVideoChannelOperation,
    );

    if (!foundChannel) {
      throw new UserNotFoundGrpcException(
        `User with filter: ${JSON.stringify(filter)} was not found in the database`,
      );
    }
    return foundChannel;
  }

  async findMany(filter: DatabaseFilter<Hub>): Promise<HubQueryModel[]> {
    const findVideoChannelsOperation = async () => {
      return await this.persistanceService.hub.findMany({
        where: this.toPrismaFilter(filter, 'many') as Prisma.HubWhereInput,
      });
    };
    const foundChannels = await handlePrismaPersistanceOperation(
      findVideoChannelsOperation,
    );
    return foundChannels;
  }
}
