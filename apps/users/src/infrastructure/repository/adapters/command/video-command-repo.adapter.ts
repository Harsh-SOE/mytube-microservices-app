import { Inject, Injectable } from '@nestjs/common';

import { UserNotFoundGrpcException } from '@app/errors';

import {
  LOGGER_PORT,
  LoggerPort,
  DatabaseFilter,
  UserCommandRepositoryPort,
} from '@users/application/ports';
import { UserAggregate } from '@users/domain/aggregates';
import { PersistanceService } from '@users/infrastructure/persistance/adapter';
import { UserAggregatePersistanceACL } from '@users/infrastructure/anti-corruption';
import { Components } from '@users/infrastructure/config';

import { Prisma, User } from '@peristance/user';

import { UserRepoFilter } from '../../filters';

@Injectable()
export class VideoCommandRepositoryAdapter
  implements UserCommandRepositoryPort
{
  public constructor(
    private userPersistanceACL: UserAggregatePersistanceACL,
    private readonly userRepoFilter: UserRepoFilter,
    private persistanceService: PersistanceService,
    @Inject(LOGGER_PORT) private logger: LoggerPort,
  ) {}

  public toPrismaFilter(
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

  public async save(model: UserAggregate): Promise<UserAggregate> {
    const createdEntityFunc = async () =>
      await this.persistanceService.user.create({
        data: this.userPersistanceACL.toPersistance(model),
      });
    const createdEntity = await this.userRepoFilter.filter(createdEntityFunc, {
      operationType: 'CREATE',
      entry: this.userPersistanceACL.toPersistance(model),
    });
    return this.userPersistanceACL.toAggregate(createdEntity);
  }

  public async saveMany(models: UserAggregate[]): Promise<number> {
    if (!models || models.length === 0) {
      return 0;
    }

    const dataToCreate = models.map((model) =>
      this.userPersistanceACL.toPersistance(model),
    );
    this.logger.info(
      `Saving: ${dataToCreate.length} documents into the database as a batch`,
      {
        component: Components.DATABASE,
        service: 'LIKE',
      },
    );
    const createdEntitiesFunc = async () =>
      await this.persistanceService.user.createMany({
        data: models.map((model) =>
          this.userPersistanceACL.toPersistance(model),
        ),
      });

    const createdEntities = await this.userRepoFilter.filter(
      createdEntitiesFunc,
      { operationType: 'CREATE', entry: dataToCreate },
    );
    return createdEntities.count;
  }

  public async updateMany(
    filter: DatabaseFilter<User>,
    newUserModel: UserAggregate,
  ): Promise<number> {
    const updatedLikesOperation = async () =>
      await this.persistanceService.user.updateMany({
        where: this.toPrismaFilter(filter, 'many') as Prisma.UserWhereInput,
        data: {
          id: newUserModel.getUserSnapshot().id,
          email: newUserModel.getUserSnapshot().email,
          handle: newUserModel.getUserSnapshot().handle,
          languagePreference: newUserModel.getUserSnapshot().languagePreference,
          phoneNumber: newUserModel.getUserSnapshot().phoneNumber,
          region: newUserModel.getUserSnapshot().region,
          themePreference: newUserModel.getUserSnapshot().themePreference,
          authUserId: newUserModel.getUserSnapshot().userAuthId,
          dob: newUserModel.getUserSnapshot().dob,
          notification: newUserModel.getUserSnapshot().notification,
          onBoardingComplete:
            newUserModel.getUserSnapshot().isOnBoardingComplete,
          isPhoneNumberVerified:
            newUserModel.getUserSnapshot().isPhoneNumbetVerified,
        },
      });

    const updatedLikes = await this.userRepoFilter.filter(
      updatedLikesOperation,
      {
        operationType: 'UPDATE',
        entry: {},
        filter,
      },
    );

    return updatedLikes.count;
  }

  async findOneById(id: string): Promise<UserAggregate> {
    const findVideoOperation = async () => {
      return await this.persistanceService.user.findUnique({
        where: { id },
      });
    };

    const foundUser = await this.userRepoFilter.filter(findVideoOperation, {
      operationType: 'CREATE',
      entry: {},
    });

    if (!foundUser) {
      throw new UserNotFoundGrpcException(
        `User with id: ${id} was not found in the database`,
      );
    }

    return this.userPersistanceACL.toAggregate(foundUser);
  }

  public async updateOne(
    filter: DatabaseFilter<User>,
    newUserModel: UserAggregate,
  ): Promise<UserAggregate> {
    const updatedLikesOperation = async () =>
      await this.persistanceService.user.update({
        where: this.toPrismaFilter(
          filter,
          'unique',
        ) as Prisma.UserWhereUniqueInput,
        data: {
          id: newUserModel.getUserSnapshot().id,
          email: newUserModel.getUserSnapshot().email,
          handle: newUserModel.getUserSnapshot().handle,
          languagePreference: newUserModel.getUserSnapshot().languagePreference,
          phoneNumber: newUserModel.getUserSnapshot().phoneNumber,
          region: newUserModel.getUserSnapshot().region,
          themePreference: newUserModel.getUserSnapshot().themePreference,
          authUserId: newUserModel.getUserSnapshot().userAuthId,
          dob: newUserModel.getUserSnapshot().dob,
          notification: newUserModel.getUserSnapshot().notification,
          onBoardingComplete:
            newUserModel.getUserSnapshot().isOnBoardingComplete,
          isPhoneNumberVerified:
            newUserModel.getUserSnapshot().isPhoneNumbetVerified,
        },
      });

    const updatedVideo = await this.userRepoFilter.filter(
      updatedLikesOperation,
      {
        operationType: 'UPDATE',
        entry: {},
        filter,
      },
    );

    return this.userPersistanceACL.toAggregate(updatedVideo);
  }

  async updateOneById(
    id: string,
    newUserModel: UserAggregate,
  ): Promise<UserAggregate> {
    const updatedLikesOperation = async () =>
      await this.persistanceService.user.update({
        where: this.toPrismaFilter(
          { id },
          'unique',
        ) as Prisma.UserWhereUniqueInput,
        data: {
          id: newUserModel.getUserSnapshot().id,
          email: newUserModel.getUserSnapshot().email,
          handle: newUserModel.getUserSnapshot().handle,
          languagePreference: newUserModel.getUserSnapshot().languagePreference,
          phoneNumber: newUserModel.getUserSnapshot().phoneNumber,
          region: newUserModel.getUserSnapshot().region,
          themePreference: newUserModel.getUserSnapshot().themePreference,
          authUserId: newUserModel.getUserSnapshot().userAuthId,
          dob: newUserModel.getUserSnapshot().dob,
          notification: newUserModel.getUserSnapshot().notification,
          onBoardingComplete:
            newUserModel.getUserSnapshot().isOnBoardingComplete,
          isPhoneNumberVerified:
            newUserModel.getUserSnapshot().isPhoneNumbetVerified,
        },
      });

    const updatedVideo = await this.userRepoFilter.filter(
      updatedLikesOperation,
      {
        operationType: 'UPDATE',
        entry: {},
        filter: { id },
      },
    );

    return this.userPersistanceACL.toAggregate(updatedVideo);
  }

  async findOne(filter: DatabaseFilter<User>): Promise<UserAggregate> {
    const findVideoOperation = async () => {
      return await this.persistanceService.user.findUnique({
        where: this.toPrismaFilter(
          filter,
          'unique',
        ) as Prisma.UserWhereUniqueInput,
      });
    };

    const foundUser = await this.userRepoFilter.filter(findVideoOperation, {
      operationType: 'READ',
      filter,
    });

    if (!foundUser) {
      throw new UserNotFoundGrpcException(
        `User with filter: ${JSON.stringify(filter)} was not found in the database`,
      );
    }

    return this.userPersistanceACL.toAggregate(foundUser);
  }

  async findMany(filter: DatabaseFilter<User>): Promise<UserAggregate[]> {
    const findVideoOperation = async () => {
      return await this.persistanceService.user.findMany({
        where: this.toPrismaFilter(filter, 'many') as Prisma.UserWhereInput,
      });
    };

    const foundUsers = await this.userRepoFilter.filter(findVideoOperation, {
      operationType: 'READ',
      filter,
    });

    if (!foundUsers) {
      throw new UserNotFoundGrpcException(
        `User with filter: ${JSON.stringify(filter)} was not found in the database`,
      );
    }

    return foundUsers.map((user) => this.userPersistanceACL.toAggregate(user));
  }

  async deleteOneById(id: string): Promise<boolean> {
    const findVideoOperation = async () => {
      return await this.persistanceService.user.delete({
        where: { id },
      });
    };

    const foundUser = await this.userRepoFilter.filter(findVideoOperation, {
      operationType: 'DELETE',
      filter: { id },
    });

    if (!foundUser) {
      throw new UserNotFoundGrpcException(
        `User with id: ${id} was not found in the database`,
      );
    }

    return true;
  }

  async deleteOne(filter: DatabaseFilter<User>): Promise<boolean> {
    const findVideoOperation = async () => {
      return await this.persistanceService.user.delete({
        where: this.toPrismaFilter(
          filter,
          'many',
        ) as Prisma.UserWhereUniqueInput,
      });
    };

    const foundUser = await this.userRepoFilter.filter(findVideoOperation, {
      operationType: 'DELETE',
      filter,
    });

    if (!foundUser) {
      throw new UserNotFoundGrpcException(
        `User with filter: ${JSON.stringify(filter)} was not found in the database`,
      );
    }

    return true;
  }

  async deleteMany(filter: DatabaseFilter<User>): Promise<number> {
    const findVideoOperation = async () => {
      return await this.persistanceService.user.deleteMany({
        where: this.toPrismaFilter(filter, 'many') as Prisma.UserWhereInput,
      });
    };

    const foundUser = await this.userRepoFilter.filter(findVideoOperation, {
      operationType: 'DELETE',
      filter,
    });

    if (!foundUser) {
      throw new UserNotFoundGrpcException(
        `User with filter: ${JSON.stringify(filter)} was not found in the database`,
      );
    }

    return foundUser.count;
  }

  async markAsOnboarded(id: string): Promise<UserAggregate> {
    const updatedLikesOperation = async () =>
      await this.persistanceService.user.update({
        where: this.toPrismaFilter(
          { id },
          'unique',
        ) as Prisma.UserWhereUniqueInput,
        data: {
          onBoardingComplete: true,
        },
      });

    const updatedVideo = await this.userRepoFilter.filter(
      updatedLikesOperation,
      {
        operationType: 'UPDATE',
        entry: {},
        filter: { id },
      },
    );

    return this.userPersistanceACL.toAggregate(updatedVideo);
  }
}
