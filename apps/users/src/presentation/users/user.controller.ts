import { Controller, UseFilters } from '@nestjs/common';
import { Observable } from 'rxjs';

import {
  UserServiceController,
  UserFindByIdDto,
  UserFoundResponse,
  UsersFoundResponse,
  UserServiceControllerMethods,
  UserChangeNotificationStatusDto,
  UserChangePreferredLanguageDto,
  UserChangePreferredThemeDto,
  UserNotificationStatusChangedResponse,
  UserPhoneNumberVerifiedResponse,
  UserPreferredLanguageChangedResponse,
  UserPreferredThemeChangedResponse,
  UserProfileUpdatedResponse,
  UserUpdateByIdDto,
  UserVerifyPhoneNumberDto,
  UserUpdateProfileDto,
  UserCreateProfileDto,
  UserProfileCreatedResponse,
  UserFindByAuthIdDto,
} from '@app/contracts/users';
import { GrpcAppExceptionFilter } from '@app/utils';

import { UserService } from './user.service';

@Controller()
@UseFilters(GrpcAppExceptionFilter)
@UserServiceControllerMethods()
export class UserController implements UserServiceController {
  constructor(private readonly userService: UserService) {}

  createProfile(
    userCompleteSignupDto: UserCreateProfileDto,
  ):
    | Promise<UserProfileCreatedResponse>
    | Observable<UserProfileCreatedResponse>
    | UserProfileCreatedResponse {
    return this.userService.createProfile(userCompleteSignupDto);
  }

  updateProfile(
    userUpdateProfileDto: UserUpdateProfileDto,
  ):
    | Promise<UserProfileUpdatedResponse>
    | Observable<UserProfileUpdatedResponse>
    | UserProfileUpdatedResponse {
    return this.userService.updateProfile(userUpdateProfileDto);
  }

  changeNotificationStatus(
    userChangeNotificationStatusDto: UserChangeNotificationStatusDto,
  ):
    | Promise<UserNotificationStatusChangedResponse>
    | Observable<UserNotificationStatusChangedResponse>
    | UserNotificationStatusChangedResponse {
    return this.changeNotificationStatus(userChangeNotificationStatusDto);
  }

  changePreferredLanguage(
    userChangePreferredLanguageDto: UserChangePreferredLanguageDto,
  ):
    | Promise<UserPreferredLanguageChangedResponse>
    | Observable<UserPreferredLanguageChangedResponse>
    | UserPreferredLanguageChangedResponse {
    return this.changePreferredLanguage(userChangePreferredLanguageDto);
  }

  changePreferredTheme(
    userChangePreferredThemeDto: UserChangePreferredThemeDto,
  ):
    | Promise<UserPreferredThemeChangedResponse>
    | Observable<UserPreferredThemeChangedResponse>
    | UserPreferredThemeChangedResponse {
    return this.changePreferredTheme(userChangePreferredThemeDto);
  }

  verifyPhoneNumber(
    userVerifyPhoneNumberDto: UserVerifyPhoneNumberDto,
  ):
    | Promise<UserPhoneNumberVerifiedResponse>
    | Observable<UserPhoneNumberVerifiedResponse>
    | UserPhoneNumberVerifiedResponse {
    return this.verifyPhoneNumber(userVerifyPhoneNumberDto);
  }

  updateUserProfileById(
    userUpdateByIdDto: UserUpdateByIdDto,
  ):
    | Promise<UserProfileUpdatedResponse>
    | Observable<UserProfileUpdatedResponse>
    | UserProfileUpdatedResponse {
    return this.userService.updateUserProfileById(userUpdateByIdDto);
  }

  findAllUsers(): Promise<UsersFoundResponse> {
    return this.userService.findAllUsers();
  }

  findOneUserById(userFindByDto: UserFindByIdDto): Promise<UserFoundResponse> {
    return this.userService.findOneUserById(userFindByDto);
  }

  findUserByAuthId(
    userFindByAuthIdDto: UserFindByAuthIdDto,
  ):
    | Promise<UserFoundResponse>
    | Observable<UserFoundResponse>
    | UserFoundResponse {
    return this.userService.findUserByAuthId(userFindByAuthIdDto);
  }
}
