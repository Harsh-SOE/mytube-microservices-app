import {
  UserAvatarImage,
  UserCoverImage,
  UserDOB,
  UserEmail,
  UserFullName,
  UserName,
} from '@users/domain/value-objects';
import { UserAggregate } from '@users/domain/aggregates';
import { AggregateFactory } from '@users/domain/factories';
import { UserEntity } from '@users/domain/entities';
import { UserCreatedDomainEvent } from '@users/domain/domain-events';

export class UserAggregateFactory implements AggregateFactory<UserAggregate> {
  create(
    id: string,
    userName: string,
    email: string,
    fullName: string,
    dob: Date,
    avatar: string,
    coverImage: string | undefined,
  ): UserAggregate {
    const user = new UserEntity(
      id,
      UserName.create(userName),
      UserEmail.create(email),
      UserFullName.create(fullName),
      UserDOB.create(dob),
      UserAvatarImage.create(avatar),
      UserCoverImage.create(coverImage),
    );
    const userAggregate = new UserAggregate(user);
    userAggregate.apply(new UserCreatedDomainEvent(user));
    return userAggregate;
  }
}
