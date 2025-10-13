import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserQueryRepository } from '@users/infrastructure/repository';

import { UserFoundResponse } from '@app/contracts/users';

import { FindUserByAuthIdQuery } from './find-by-auth-id.query';

@QueryHandler(FindUserByAuthIdQuery)
export class FindUserByAuthIdQueryHandler
  implements IQueryHandler<FindUserByAuthIdQuery>
{
  constructor(private readonly userRepo: UserQueryRepository) {}

  async execute({
    findUserbyAuthIdDto,
  }: FindUserByAuthIdQuery): Promise<UserFoundResponse> {
    const { authId } = findUserbyAuthIdDto;
    const userQueryModel = await this.userRepo.findOne({ authUserId: authId });
    return {
      ...userQueryModel,
      dob: userQueryModel.dob?.toISOString(),
      phoneNumber: userQueryModel.phoneNumber ?? undefined,
    };
  }
}
