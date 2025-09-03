import { UserFindByIdDto } from '@app/contracts/users';

export class FindUserByIdQuery {
  constructor(public readonly userFindByIdDto: UserFindByIdDto) {}
}
