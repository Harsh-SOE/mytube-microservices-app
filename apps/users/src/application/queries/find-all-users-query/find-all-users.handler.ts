import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UsersFoundResponse } from '@app/contracts/users';

import { UserQueryRepository } from '@users/infrastructure/repository';

import { FindAllUsersQuery } from './find-all-user.query';

@QueryHandler(FindAllUsersQuery)
export class FindAllUsersHandler implements IQueryHandler<FindAllUsersQuery> {
  constructor(private readonly userRepo: UserQueryRepository) {}

  async execute(): Promise<UsersFoundResponse> {
    const allUsers = await this.userRepo.findMany({});
    return {
      userFoundResponse: allUsers.map((user) => ({
        ...user,
        dob: user.dob.toISOString(),
      })),
    };
  }
}
