import { UserFindByAuthIdDto } from '@app/contracts/users';

export class FindUserByAuthIdQuery {
  public constructor(
    public readonly findUserbyAuthIdDto: UserFindByAuthIdDto,
  ) {}
}
