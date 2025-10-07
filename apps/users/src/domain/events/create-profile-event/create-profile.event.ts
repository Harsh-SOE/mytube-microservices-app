import { UserAggregate } from '@users/domain/aggregates';

export class CreateProfileEvent {
  public constructor(public readonly user: UserAggregate) {}
}
