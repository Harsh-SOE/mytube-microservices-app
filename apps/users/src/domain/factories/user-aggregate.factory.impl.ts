import {
  UserHandle,
  UserDOB,
  UserEmail,
  UserPhoneNumber,
  UserThemePreference,
  UserLanguagePreference,
  UserRegion,
} from '@users/domain/value-objects';
import { UserAggregate } from '@users/domain/aggregates';
import { AggregateFactory } from '@users/domain/factories';
import { UserEntity } from '@users/domain/entities';

import { CreateProfileEvent } from '../events';

export class UserAggregateFactory implements AggregateFactory<UserAggregate> {
  create(
    id: string,
    userAuthId: string,
    handle: string,
    email: string,
    dob?: Date,
    phoneNumber?: string,
    isPhoneNumberVerified?: boolean,
    notification?: boolean,
    preferredTheme?: string,
    preferredLanguage?: string,
    isOnBoardingComplete?: boolean,
    region?: string,
  ): UserAggregate {
    const user = new UserEntity(
      id,
      userAuthId,
      UserHandle.create(handle),
      UserEmail.create(email),
      UserDOB.create(dob),
      UserPhoneNumber.create(phoneNumber),
      isPhoneNumberVerified ?? false,
      notification ?? true,
      UserThemePreference.create(preferredTheme),
      UserLanguagePreference.create(preferredLanguage),
      isOnBoardingComplete ?? false,
      UserRegion.create(region),
    );
    const userAggregate = new UserAggregate(user);

    // add an event that user was created...
    userAggregate.apply(new CreateProfileEvent(userAggregate));

    return userAggregate;
  }
}
