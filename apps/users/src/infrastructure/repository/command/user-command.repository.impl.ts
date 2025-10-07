import { Injectable } from '@nestjs/common';

import { LogExecutionTime } from '@app/utils';
import { UserNotFoundGrpcException } from '@app/errors';

import { UserAggregate } from '@users/domain/aggregates';
import { PersistanceService } from '@users/infrastructure/persistance';
import { UserAggregatePersistanceACL } from '@users/infrastructure/anti-corruption';

import { Prisma, User } from '@peristance/user';
import {
  DatabaseFilter,
  handlePrismaPersistanceOperation,
} from '@app/infrastructure';
import { IUserCommandRepository } from './prisma-entity-command.repository';

@Injectable()
export class UserCommandRepository
  implements IUserCommandRepository<UserAggregate, User>
{
  public constructor(
    private readonly userEntityPeristanceACL: UserAggregatePersistanceACL,
    private readonly peristanceService: PersistanceService,
  ) {}

  /**
   * Converts a generic `DatabaseFilter<User>` object into a Prisma-compatible filter object
   * (`Prisma.UserWhereInput` or `Prisma.UserWhereUniqueInput`) for querying the database.
   *
   * @param filter - The filter object describing the conditions to apply. This can include direct field matches,
   *                 as well as logical operators (`and`, `or`, `not`) for complex queries.
   * @param mode - Specifies the type of filter to generate:
   *   - `'unique'`: Generates a filter suitable for unique queries (e.g., `findUnique`). Only direct field matches are included.
   *   - `'many'`: Generates a filter suitable for multi-record queries (e.g., `findMany`). Supports logical operators (`AND`, `OR`, `NOT`).
   * @returns A Prisma filter object (`Prisma.UserWhereInput` or `Prisma.UserWhereUniqueInput`) that can be used in Prisma queries.
   *
   * @example
   * // Example DatabaseFilter<User>:
   * const filter: DatabaseFilter<User> = {
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
    filter: DatabaseFilter<User>,
    mode: 'many' | 'unique',
  ): Prisma.UserWhereInput | Prisma.UserWhereUniqueInput {
    const prismaFilter: Prisma.UserWhereInput | Prisma.UserWhereUniqueInput =
      {};

    (Object.keys(filter) as Array<keyof User>).forEach((key) => {
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
  async loadOneAggregateById(id: string): Promise<UserAggregate> {
    const findUserOperation = async () => {
      return await this.peristanceService.user.findUnique({
        where: { id },
      });
    };
    const foundUser = await handlePrismaPersistanceOperation(findUserOperation);
    if (!foundUser) {
      throw new UserNotFoundGrpcException(
        `User with id: ${id} was not found...`,
      );
    }
    return this.userEntityPeristanceACL.toAggregate(foundUser);
  }

  @LogExecutionTime()
  async loadOneAggregate(filter: DatabaseFilter<User>): Promise<UserAggregate> {
    const findUserOperation = async () => {
      return await this.peristanceService.user.findFirst({
        where: { ...this.toPrismaFilter(filter, 'unique') },
      });
    };
    const foundUser = await handlePrismaPersistanceOperation(findUserOperation);
    if (!foundUser) {
      throw new UserNotFoundGrpcException(`User not found...`);
    }
    return this.userEntityPeristanceACL.toAggregate(foundUser);
  }

  @LogExecutionTime()
  async loadManyAggregate(
    filter: DatabaseFilter<User>,
  ): Promise<UserAggregate[]> {
    const findUserOperation = async () => {
      return await this.peristanceService.user.findMany({
        where: { ...this.toPrismaFilter(filter, 'many') },
      });
    };
    const foundUsers =
      await handlePrismaPersistanceOperation(findUserOperation);
    if (!foundUsers) {
      throw new UserNotFoundGrpcException(`User not found...`);
    }
    return foundUsers.map((user) =>
      this.userEntityPeristanceACL.toAggregate(user),
    );
  }

  @LogExecutionTime()
  public async createOne(domain: UserAggregate): Promise<UserAggregate> {
    const createdEntityOperation = async () => {
      return await this.peristanceService.user.create({
        data: {
          ...this.userEntityPeristanceACL.toPersistance(domain),
        },
      });
    };
    const createdEntity = await handlePrismaPersistanceOperation(
      createdEntityOperation,
    );
    return this.userEntityPeristanceACL.toAggregate(createdEntity);
  }

  @LogExecutionTime()
  public async createMany(domains: UserAggregate[]): Promise<number> {
    const createdEntityOperation = async () => {
      return await this.peristanceService.user.createMany({
        data: domains.map((domain) =>
          this.userEntityPeristanceACL.toPersistance(domain),
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
    filter: DatabaseFilter<User>,
    domainAggregate: UserAggregate,
  ): Promise<UserAggregate> {
    const updateDomainOperation = async () => {
      return await this.peristanceService.user.update({
        where: this.toPrismaFilter(
          filter,
          'unique',
        ) as Prisma.UserWhereUniqueInput,
        data: this.userEntityPeristanceACL.toPersistance(domainAggregate),
      });
    };
    const updatedDomainResult = await handlePrismaPersistanceOperation(
      updateDomainOperation,
    );
    return this.userEntityPeristanceACL.toAggregate(updatedDomainResult);
  }

  @LogExecutionTime()
  public async updateOneById(
    id: string,
    domainAggregate: UserAggregate,
  ): Promise<UserAggregate> {
    const updateDomainOperation = async () => {
      return await this.peristanceService.user.update({
        where: { id },
        data: this.userEntityPeristanceACL.toPersistance(domainAggregate),
      });
    };
    const updatedDomainResult = await handlePrismaPersistanceOperation(
      updateDomainOperation,
    );
    return this.userEntityPeristanceACL.toAggregate(updatedDomainResult);
  }

  @LogExecutionTime()
  public async updateMany(
    filter: DatabaseFilter<User>,
    domainAggregate: UserAggregate,
  ): Promise<number> {
    const updateEntitiesOperation = async () => {
      return await this.peristanceService.user.updateMany({
        where: this.toPrismaFilter(filter, 'many') as Prisma.UserWhereInput,
        data: this.userEntityPeristanceACL.toPersistance(domainAggregate),
      });
    };

    const updatedEntitiesResult = await handlePrismaPersistanceOperation(
      updateEntitiesOperation,
    );
    if (!updatedEntitiesResult.count) {
      throw new UserNotFoundGrpcException(
        `No users with filter: ${JSON.stringify(filter)} were found in the database`,
      );
    }
    return updatedEntitiesResult.count;
  }

  @LogExecutionTime()
  public async deleteOne(filter: DatabaseFilter<User>): Promise<boolean> {
    const deleteEntityOperation = async () => {
      return await this.peristanceService.user.delete({
        where: this.toPrismaFilter(
          filter,
          'unique',
        ) as Prisma.UserWhereUniqueInput,
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
      return await this.peristanceService.user.delete({
        where: { id },
      });
    };
    const deletedEntity = await handlePrismaPersistanceOperation(
      deleteEntityOperation,
    );
    return deletedEntity ? true : false;
  }

  @LogExecutionTime()
  public async deleteMany(filter: DatabaseFilter<User>): Promise<number> {
    const deleteEntityOperation = async () => {
      return await this.peristanceService.user.deleteMany({
        where: this.toPrismaFilter(filter, 'many') as Prisma.UserWhereInput,
      });
    };
    const deletedEntityResponse = await handlePrismaPersistanceOperation(
      deleteEntityOperation,
    );
    if (!deletedEntityResponse.count)
      throw new UserNotFoundGrpcException(
        `User with filter: ${JSON.stringify(filter)} was not found in the database`,
      );
    return deletedEntityResponse.count;
  }

  @LogExecutionTime()
  async markAsOnboarded(id: string): Promise<UserAggregate> {
    const markAsOnboardedOperation = async () => {
      return await this.peristanceService.user.update({
        where: { id },
        data: { onBoardingComplete: true },
      });
    };

    const onBoardedEntity = await handlePrismaPersistanceOperation(
      markAsOnboardedOperation,
    );

    return this.userEntityPeristanceACL.toAggregate(onBoardedEntity);
  }
}
