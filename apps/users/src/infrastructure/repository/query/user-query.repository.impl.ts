import { Injectable } from '@nestjs/common';

import { LogExecutionTime } from '@app/utils';
import { UserNotFoundGrpcException } from '@app/errors';

import { Prisma, User } from '@peristance/user';

import { UserQueryModel } from '@users/application/queries';
import { PersistanceService } from '@users/infrastructure/persistance';
import {
  DatabaseFilter,
  handlePrismaPersistanceOperation,
} from '@app/infrastructure';
import { IUserQueryRepository } from './prisma-entity-query.repository';

@Injectable()
export class UserQueryRepository
  implements IUserQueryRepository<DatabaseFilter<User>, UserQueryModel>
{
  constructor(private readonly persistanceService: PersistanceService) {}
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

    return prismaFilter;
  }

  async findById(id: string): Promise<UserQueryModel> {
    const findUserOperation = async () => {
      return await this.persistanceService.user.findUnique({
        where: { id },
      });
    };

    const foundUser = await handlePrismaPersistanceOperation(findUserOperation);
    if (!foundUser) {
      throw new UserNotFoundGrpcException(
        `User with id${id} was not found in the database`,
      );
    }
    return foundUser;
  }

  @LogExecutionTime()
  async findOne(filter: DatabaseFilter<User>): Promise<UserQueryModel> {
    const findUserOperation = async () => {
      return await this.persistanceService.user.findUnique({
        where: this.toPrismaFilter(
          filter,
          'unique',
        ) as Prisma.UserWhereUniqueInput,
      });
    };

    const foundUser = await handlePrismaPersistanceOperation(findUserOperation);

    if (!foundUser) {
      throw new UserNotFoundGrpcException(
        `User with filter: ${JSON.stringify(filter)} was not found in the database`,
      );
    }
    return foundUser;
  }

  async findMany(filter: DatabaseFilter<User>): Promise<UserQueryModel[]> {
    const findUsersOperation = async () => {
      return await this.persistanceService.user.findMany({
        where: this.toPrismaFilter(filter, 'many') as Prisma.UserWhereInput,
      });
    };
    const foundUsers =
      await handlePrismaPersistanceOperation(findUsersOperation);
    return foundUsers;
  }
}
