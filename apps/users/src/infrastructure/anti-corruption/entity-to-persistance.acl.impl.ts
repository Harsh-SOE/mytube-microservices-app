import { Injectable } from '@nestjs/common';

import {
  UserAvatarImage,
  UserCoverImage,
  UserDOB,
  UserEmail,
  UserFullName,
  UserName,
} from '@users/domain/value-objects';
import { UserAggregate } from '@users/domain/aggregates';
import { UserEntity } from '@users/domain/entities';

import { User } from '@peristance/user';
import { IAggregatePersistanceACL } from '@app/infrastructure';

@Injectable()
export class UserEntityToPersistanceACL
  implements
    IAggregatePersistanceACL<
      UserAggregate,
      Omit<User, 'createdAt' | 'updatedAt'>
    >
{
  toEntity(persistance: Omit<User, 'createdAt' | 'updatedAt'>): UserAggregate {
    const user = new UserEntity(
      persistance.id,
      new UserName(persistance.userName),
      new UserEmail(persistance.email),
      new UserFullName(persistance.fullName),
      new UserDOB(persistance.dob),
      new UserAvatarImage(persistance.avatar),
      new UserCoverImage(persistance.coverImage ?? undefined),
    );
    return new UserAggregate(user);
  }
  toPersistance(entity: UserAggregate): Omit<User, 'createdAt' | 'updatedAt'> {
    return {
      id: entity.getUser().id,
      userName: entity.getUser().userName,
      email: entity.getUser().email,
      fullName: entity.getUser().fullName,
      dob: entity.getUser().dob,
      avatar: entity.getUser().avatar,
      coverImage: entity.getUser().coverImage ?? null,
    };
  }
}
