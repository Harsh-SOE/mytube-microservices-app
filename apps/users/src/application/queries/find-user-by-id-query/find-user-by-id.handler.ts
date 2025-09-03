import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserQueryRepository } from '@users/infrastructure/repository';

import { UserFoundResponse } from '@app/contracts/users';

import { FindUserByIdQuery } from './find-user-by-id.query';

@QueryHandler(FindUserByIdQuery)
export class FindUserByIdHandler implements IQueryHandler<FindUserByIdQuery> {
  constructor(private readonly userRepo: UserQueryRepository) {}

  async execute({
    userFindByIdDto,
  }: FindUserByIdQuery): Promise<UserFoundResponse> {
    const { id } = userFindByIdDto;
    const user = await this.userRepo.findOneByid(id);
    return { ...user, dob: user.dob.toISOString() };
  }
}
