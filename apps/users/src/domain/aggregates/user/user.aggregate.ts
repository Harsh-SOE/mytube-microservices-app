import { AggregateRoot } from '@nestjs/cqrs';

import { UserEntity } from '@users/domain/entities';
import {
  ChangeLanguageEvent,
  ChangeNotificationStatusEvent,
  ChangeThemeEvent,
  PhoneNumberVerfiedEvent,
  UpdateProfileEvent,
} from '@users/domain/events';
import { OnBoardingCompletedEvent } from '@users/domain/events/onboarding-completed-event/onboarding-completed.event';

// INFO: Here we just have one entity for now, but in future we can have multiple entities for user...
export class UserAggregate extends AggregateRoot {
  public constructor(private user: UserEntity) {
    super();
  }

  public getUserSnapshot() {
    return this.user.getSnapshot();
  }

  private getUserEntity() {
    return this.user;
  }

  public updateUserProfile(dob?: Date, phoneNumber?: string) {
    if (dob) this.getUserEntity().updateDOB(new Date(dob));
    if (phoneNumber) this.getUserEntity().updatePhoneNumber(phoneNumber);

    if (dob && phoneNumber) {
      this.markProfileAsComplete();
    }

    // event for profile updated here...
    this.apply(
      new UpdateProfileEvent({
        updatedProfile: {
          id: this.getUserSnapshot().id,
          dob: dob?.toISOString(),
          phoneNumber,
        },
      }),
    );
  }

  public verifyUserPhoneNumber() {
    if (!this.getUserEntity().getPhoneNumber()) {
      return;
    }
    this.getUserEntity().verifyPhoneNumber();

    // event for phone number verification here...
    this.apply(
      new PhoneNumberVerfiedEvent({
        id: this.getUserSnapshot().id,
        phoneNumber: this.getUserSnapshot().phoneNumber as string,
      }),
    );
  }

  public changeUserPreferredTheme(newTheme: string) {
    this.getUserEntity().updateThemePreference(newTheme);

    // event for theme changed here...
    this.apply(
      new ChangeThemeEvent({
        id: this.getUserSnapshot().id,
        theme: this.getUserSnapshot().themePreference,
      }),
    );
  }

  public changeUserPreferredlanguage(newLanguage: string) {
    this.getUserEntity().updateLanguagePreference(newLanguage);

    // event for language changed here...
    this.apply(
      new ChangeLanguageEvent({
        id: this.getUserSnapshot().id,
        langauge: this.getUserEntity().getLanguagePreference(),
      }),
    );
  }

  public changeUserNotificationPreference(newNotificationStatus: boolean) {
    this.getUserEntity().updateNotificationStatus(newNotificationStatus);

    // event for notification status changed here...
    this.apply(
      new ChangeNotificationStatusEvent({
        id: this.getUserSnapshot().id,
        status: this.getUserSnapshot().notification,
      }),
    );
  }

  private markProfileAsComplete() {
    if (this.getUserEntity().getIsOnBoardingComplete() === true) {
      throw new Error(`Profile was already completed`);
    }
    this.getUserEntity().updateOnBoardingStatus(true);

    // event for profile completion here...
    this.apply(new OnBoardingCompletedEvent({ id: this.getUserSnapshot().id }));
  }
}
