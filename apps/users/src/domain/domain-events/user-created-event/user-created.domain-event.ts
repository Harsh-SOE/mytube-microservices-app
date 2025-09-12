import { UserEntity } from '@users/domain/entities';

export class UserCreatedDomainEvent {
  constructor(public readonly user: UserEntity) {}
}
