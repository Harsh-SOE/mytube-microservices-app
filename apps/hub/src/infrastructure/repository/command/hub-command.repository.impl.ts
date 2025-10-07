import { Injectable } from '@nestjs/common';

import { LogExecutionTime } from '@app/utils';
import { UserNotFoundGrpcException } from '@app/errors';
import {
  DatabaseFilter,
  handlePrismaPersistanceOperation,
} from '@app/infrastructure';

import { HubAggregate } from '@hub/domain/aggregates';
import { Hub, Prisma } from '@peristance/hub';
import { PersistanceService } from '@hub/infrastructure/persistance';
import { HubAggregatePersistanceACL } from '@hub/infrastructure/anti-corruption';

import { IHubCommandRepository } from './prisma-entity-command.repository';

@Injectable()
export class HubCommandRepository
  implements IHubCommandRepository<HubAggregate, Hub>
{
  public constructor(
    private readonly channelEntityPeristanceACL: HubAggregatePersistanceACL,
    private readonly peristanceService: PersistanceService,
  ) {}

  /**
   * Converts a generic `DatabaseFilter<Hub>` object into a Prisma-compatible filter object
   * (`Prisma.HubWhereInput` or `Prisma.HubWhereUniqueInput`) for querying the database.
   *
   * @param filter - The filter object describing the conditions to apply. This can include direct field matches,
   *                 as well as logical operators (`and`, `or`, `not`) for complex queries.
   * @param mode - Specifies the type of filter to generate:
   *   - `'unique'`: Generates a filter suitable for unique queries (e.g., `findUnique`). Only direct field matches are included.
   *   - `'many'`: Generates a filter suitable for multi-record queries (e.g., `findMany`). Supports logical operators (`AND`, `OR`, `NOT`).
   * @returns A Prisma filter object (`Prisma.HubWhereInput` or `Prisma.HubWhereUniqueInput`) that can be used in Prisma queries.
   *
   * @example
   * // Example DatabaseFilter<Hub>:
   * const filter: DatabaseFilter<Hub> = {
   *   id: '123',
   *   email: 'user@example.com',
   *   and: [
   *     { field: 'age', operator: 'gte', value: 18 },
   *     { field: 'isActive', operator: 'equals', value: true }
   *   ],
   *   or: [
   *     { field: 'role', operator: 'equals', value: 'admin' }
   *   ],
   *   not: [
   *     { field: 'deletedAt', operator: 'not', value: null }
   *   ]
   * };
   *
   * // Usage:
   * const prismaFilter = toPrismaFilter(filter, 'many');
   *
   * // Modes:
   * // - 'unique': Only direct field matches (e.g., { id: '123' }) are included.
   * // - 'many': Supports logical operators (AND, OR, NOT) for complex queries.
   */
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

    console.log(prismaFilter);

    return prismaFilter;
  }

  @LogExecutionTime()
  async loadOneAggregateById(id: string): Promise<HubAggregate> {
    const findUserOperation = async () => {
      return await this.peristanceService.hub.findUnique({
        where: { id },
      });
    };
    const foundChannel =
      await handlePrismaPersistanceOperation(findUserOperation);
    if (!foundChannel) {
      throw new UserNotFoundGrpcException(
        `Channel with id: ${id} was not found...`,
      );
    }
    return this.channelEntityPeristanceACL.toAggregate(foundChannel);
  }

  @LogExecutionTime()
  async loadOneAggregate(filter: DatabaseFilter<Hub>): Promise<HubAggregate> {
    const findUserOperation = async () => {
      return await this.peristanceService.hub.findFirst({
        where: { ...this.toPrismaFilter(filter, 'unique') },
      });
    };
    const foundChannel =
      await handlePrismaPersistanceOperation(findUserOperation);
    if (!foundChannel) {
      throw new UserNotFoundGrpcException(`Channel not found...`);
    }
    return this.channelEntityPeristanceACL.toAggregate(foundChannel);
  }

  @LogExecutionTime()
  async loadManyAggregate(
    filter: DatabaseFilter<Hub>,
  ): Promise<HubAggregate[]> {
    const findUserOperation = async () => {
      return await this.peristanceService.hub.findMany({
        where: { ...this.toPrismaFilter(filter, 'many') },
      });
    };
    const foundChannels =
      await handlePrismaPersistanceOperation(findUserOperation);
    if (!foundChannels) {
      throw new UserNotFoundGrpcException(`Channels not found...`);
    }
    return foundChannels.map((user) =>
      this.channelEntityPeristanceACL.toAggregate(user),
    );
  }

  @LogExecutionTime()
  public async createOne(domain: HubAggregate): Promise<HubAggregate> {
    const createdEntityOperation = async () => {
      return await this.peristanceService.hub.create({
        data: {
          ...this.channelEntityPeristanceACL.toPersistance(domain),
        },
      });
    };
    const createdEntity = await handlePrismaPersistanceOperation(
      createdEntityOperation,
    );
    return this.channelEntityPeristanceACL.toAggregate(createdEntity);
  }

  @LogExecutionTime()
  public async createMany(domains: HubAggregate[]): Promise<number> {
    const createdEntityOperation = async () => {
      return await this.peristanceService.hub.createMany({
        data: domains.map((domain) =>
          this.channelEntityPeristanceACL.toPersistance(domain),
        ),
      });
    };

    const createdEntity = await handlePrismaPersistanceOperation(
      createdEntityOperation,
    );
    return createdEntity.count;
  }

  @LogExecutionTime()
  public async updateOne(
    filter: DatabaseFilter<Hub>,
    domainAggregate: HubAggregate,
  ): Promise<HubAggregate> {
    const updateDomainOperation = async () => {
      return await this.peristanceService.hub.update({
        where: this.toPrismaFilter(
          filter,
          'unique',
        ) as Prisma.HubWhereUniqueInput,
        data: this.channelEntityPeristanceACL.toPersistance(domainAggregate),
      });
    };
    const updatedDomainResult = await handlePrismaPersistanceOperation(
      updateDomainOperation,
    );
    return this.channelEntityPeristanceACL.toAggregate(updatedDomainResult);
  }

  @LogExecutionTime()
  public async updateOneById(
    id: string,
    domainAggregate: HubAggregate,
  ): Promise<HubAggregate> {
    const updateDomainOperation = async () => {
      return await this.peristanceService.hub.update({
        where: { id },
        data: this.channelEntityPeristanceACL.toPersistance(domainAggregate),
      });
    };
    const updatedDomainResult = await handlePrismaPersistanceOperation(
      updateDomainOperation,
    );
    return this.channelEntityPeristanceACL.toAggregate(updatedDomainResult);
  }

  @LogExecutionTime()
  public async updateMany(
    filter: DatabaseFilter<Hub>,
    domainAggregate: HubAggregate,
  ): Promise<number> {
    const updateEntitiesOperation = async () => {
      return await this.peristanceService.hub.updateMany({
        where: this.toPrismaFilter(filter, 'many') as Prisma.HubWhereInput,
        data: this.channelEntityPeristanceACL.toPersistance(domainAggregate),
      });
    };

    const updatedEntitiesResult = await handlePrismaPersistanceOperation(
      updateEntitiesOperation,
    );
    if (!updatedEntitiesResult.count) {
      throw new UserNotFoundGrpcException(
        `No channels with filter: ${JSON.stringify(filter)} were found in the database`,
      );
    }
    return updatedEntitiesResult.count;
  }

  @LogExecutionTime()
  public async deleteOne(filter: DatabaseFilter<Hub>): Promise<boolean> {
    const deleteEntityOperation = async () => {
      return await this.peristanceService.hub.delete({
        where: this.toPrismaFilter(
          filter,
          'unique',
        ) as Prisma.HubWhereUniqueInput,
      });
    };
    const deletedEntity = await handlePrismaPersistanceOperation(
      deleteEntityOperation,
    );
    return deletedEntity ? true : false;
  }

  @LogExecutionTime()
  public async deleteOneById(id: string): Promise<boolean> {
    const deleteEntityOperation = async () => {
      return await this.peristanceService.hub.delete({
        where: { id },
      });
    };
    const deletedEntity = await handlePrismaPersistanceOperation(
      deleteEntityOperation,
    );
    return deletedEntity ? true : false;
  }

  @LogExecutionTime()
  public async deleteMany(filter: DatabaseFilter<Hub>): Promise<number> {
    const deleteEntityOperation = async () => {
      return await this.peristanceService.hub.deleteMany({
        where: this.toPrismaFilter(filter, 'many') as Prisma.HubWhereInput,
      });
    };
    const deletedEntityResponse = await handlePrismaPersistanceOperation(
      deleteEntityOperation,
    );
    if (!deletedEntityResponse.count)
      throw new UserNotFoundGrpcException(
        `Channel with filter: ${JSON.stringify(filter)} was not found in the database`,
      );
    return deletedEntityResponse.count;
  }
}
