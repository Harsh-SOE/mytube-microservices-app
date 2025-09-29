import { Inject, Injectable } from '@nestjs/common';
import winston from 'winston';

import {
  DatabaseFilter,
  handlePrismaPersistanceOperation,
} from '@app/infrastructure';
import { WINSTON_LOGGER } from '@app/clients';

import { Prisma, View } from '@persistance/views-aggregator';
import { ViewAggregate } from '@views-aggregator/domain/aggregates';
import { ViewPeristanceAggregateACL } from '@views-aggregator/infrastructure/anti-corruption';
import { PersistanceService } from '@views-aggregator/infrastructure/persistance';

import { IViewRepository } from './view.repo';

@Injectable()
export class ViewRepository implements IViewRepository<ViewAggregate> {
  constructor(
    private persistanceService: PersistanceService,
    private viewPersistanceACL: ViewPeristanceAggregateACL,
    @Inject(WINSTON_LOGGER) private readonly logger: winston.Logger,
  ) {}

  toPrismaFilter(
    filter: DatabaseFilter<View>,
    mode: 'many' | 'unique',
  ): Prisma.ViewWhereInput | Prisma.ViewWhereUniqueInput {
    const prismaFilter: Prisma.ViewWhereInput | Prisma.ViewWhereUniqueInput =
      {};

    (Object.keys(filter) as Array<keyof View>).forEach((key) => {
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

  async watchVideo(model: ViewAggregate): Promise<ViewAggregate> {
    const createdEntity = await this.persistanceService.view.create({
      data: this.viewPersistanceACL.toPersistance(model),
    });
    return this.viewPersistanceACL.toAggregate(createdEntity);
  }

  async watchVideosInBatches(models: ViewAggregate[]): Promise<number> {
    // 1. Handle empty input to prevent unnecessary database calls.
    if (!models || models.length === 0) {
      return 0;
    }

    // 2. Map the data *once* and store it in a constant.
    const dataToCreate = models.map((model) =>
      this.viewPersistanceACL.toPersistance(model),
    );
    this.logger.log(
      'database',
      `Saving: ${dataToCreate.length} documents into the database as a batch`,
    );
    const createdEntitiesFunc = async () =>
      await this.persistanceService.view.createMany({
        data: models.map((model) =>
          this.viewPersistanceACL.toPersistance(model),
        ),
      });

    const createdEntities =
      await handlePrismaPersistanceOperation(createdEntitiesFunc);
    return createdEntities.count;
  }
}
