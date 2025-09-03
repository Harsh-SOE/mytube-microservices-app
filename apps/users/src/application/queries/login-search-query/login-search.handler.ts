import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';

import { UserQueryRepository } from '@users/infrastructure/repository';

import { UserLoginResponse } from '@app/contracts/users';

import { LoginSearchQuery } from './login-search.query';

@QueryHandler(LoginSearchQuery)
export class LoginSearchHandler implements IQueryHandler<LoginSearchQuery> {
  constructor(private userRepo: UserQueryRepository) {}

  async execute({
    userloginDto,
  }: LoginSearchQuery): Promise<UserLoginResponse> {
    const user = await this.userRepo.findOne(userloginDto);
    return { ...user, dob: user.dob.toISOString() };
  }
}
