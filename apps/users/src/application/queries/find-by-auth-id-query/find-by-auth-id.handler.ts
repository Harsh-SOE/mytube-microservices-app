import { Inject } from '@nestjs/common';
import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserFoundResponse } from '@app/contracts/users';

import {
  USER_QUERY_REROSITORY,
  UserQueryRepositoryPort,
} from '@users/application/ports';
import { UserNotFoundException } from '@users/application/exceptions';

import { FindUserByAuthIdQuery } from './find-by-auth-id.query';

@QueryHandler(FindUserByAuthIdQuery)
export class FindUserByAuthIdQueryHandler
  implements IQueryHandler<FindUserByAuthIdQuery>
{
  constructor(
    @Inject(USER_QUERY_REROSITORY)
    private readonly userRepo: UserQueryRepositoryPort,
  ) {}

  async execute({
    findUserbyAuthIdDto,
  }: FindUserByAuthIdQuery): Promise<UserFoundResponse> {
    const { authId } = findUserbyAuthIdDto;
    const userQueryModel = await this.userRepo.findOne({ authUserId: authId });

    if (!userQueryModel) {
      throw new UserNotFoundException({
        message: `User with auth id: ${authId} was not found in the database`,
      });
    }

    return {
      ...userQueryModel,
      dob: userQueryModel.dob?.toISOString(),
      phoneNumber: userQueryModel.phoneNumber ?? undefined,
    };
  }
}
