import { AggregateRoot } from '@nestjs/cqrs';

import { UserEntity } from '@users/domain/entities';
import { UserUpdatedDomainEvent } from '@users/domain/domain-events';

// INFO: Here we just have one entity for now, but in future we can have multiple entities for user...
export class UserAggregate extends AggregateRoot {
  public constructor(private user: UserEntity) {
    super();
  }

  public getUser() {
    return this.user.getSnapshot();
  }

  public getUserEntity() {
    return this.user;
  }

  public updateUserProfile(fullName?: string, email?: string, dob?: Date) {
    if (fullName) this.getUserEntity().updateFullName(fullName);
    if (email) this.getUserEntity().updateEmail(email);
    if (dob) this.getUserEntity().updateDOB(new Date(dob));

    this.apply(new UserUpdatedDomainEvent(this.user.getId()));

    return this.user;
  }
}
