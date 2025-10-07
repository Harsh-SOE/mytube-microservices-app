import { Inject, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Logger } from 'winston';

import { WINSTON_LOGGER } from '@app/clients/constant';

import {
  FindAllUsersQuery,
  FindUserByAuthIdQuery,
  FindUserByIdQuery,
} from '@users/application/queries';

import {
  UserChangeNotificationStatusDto,
  UserChangePreferredLanguageDto,
  UserChangePreferredThemeDto,
  UserCreateProfileDto,
  UserFindByAuthIdDto,
  UserFindByIdDto,
  UserFoundResponse,
  UserNotificationStatusChangedResponse,
  UserPhoneNumberVerifiedResponse,
  UserPreferredLanguageChangedResponse,
  UserPreferredThemeChangedResponse,
  UserProfileCreatedResponse,
  UserProfileUpdatedResponse,
  UsersFoundResponse,
  UserUpdateByIdDto,
  UserUpdateProfileDto,
  UserVerifyPhoneNumberDto,
} from '@app/contracts/users';
import {
  ChangeLanguageCommand,
  ChangeNotificationCommand,
  ChangeThemeCommand,
  CreateProfileCommand,
  UpdateProfileCommand,
  VerifyPhoneNumberCommand,
} from '../commands';

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(WINSTON_LOGGER) private logger: Logger,
  ) {}

  async createProfile(
    userCompleteSignupDto: UserCreateProfileDto,
  ): Promise<UserProfileCreatedResponse> {
    return this.commandBus.execute<
      CreateProfileCommand,
      UserProfileCreatedResponse
    >(new CreateProfileCommand(userCompleteSignupDto));
  }

  async updateProfile(
    userCompleteProfileDto: UserUpdateProfileDto,
  ): Promise<UserProfileUpdatedResponse> {
    return this.commandBus.execute<
      UpdateProfileCommand,
      UserProfileUpdatedResponse
    >(new UpdateProfileCommand(userCompleteProfileDto));
  }

  async changeNotificationStatus(
    userChangeNotificationStatusDto: UserChangeNotificationStatusDto,
  ): Promise<UserNotificationStatusChangedResponse> {
    return this.commandBus.execute<
      ChangeNotificationCommand,
      UserNotificationStatusChangedResponse
    >(new ChangeNotificationCommand(userChangeNotificationStatusDto));
  }

  async changePreferredLanguage(
    userChangePreferredLanguageDto: UserChangePreferredLanguageDto,
  ): Promise<UserPreferredLanguageChangedResponse> {
    return this.commandBus.execute<
      ChangeLanguageCommand,
      UserPreferredLanguageChangedResponse
    >(new ChangeLanguageCommand(userChangePreferredLanguageDto));
  }

  async changePreferredTheme(
    userChangePreferredThemeDto: UserChangePreferredThemeDto,
  ): Promise<UserPreferredThemeChangedResponse> {
    return this.commandBus.execute<
      ChangeThemeCommand,
      UserPreferredThemeChangedResponse
    >(new ChangeThemeCommand(userChangePreferredThemeDto));
  }

  async changeVerifyPhoneNumber(
    userVerifyPhoneNumberDto: UserVerifyPhoneNumberDto,
  ): Promise<UserPhoneNumberVerifiedResponse> {
    return this.commandBus.execute<
      VerifyPhoneNumberCommand,
      UserPhoneNumberVerifiedResponse
    >(new VerifyPhoneNumberCommand(userVerifyPhoneNumberDto));
  }

  async updateUserProfileById(
    userUpdateProfileByIdDto: UserUpdateByIdDto,
  ): Promise<UserProfileUpdatedResponse> {
    return this.commandBus.execute<
      UpdateProfileCommand,
      UserProfileUpdatedResponse
    >(new UpdateProfileCommand(userUpdateProfileByIdDto));
  }

  async findOneUserById(
    userFindByDto: UserFindByIdDto,
  ): Promise<UserFoundResponse> {
    this.logger.info(
      `USER::FIND_ONE_BY_ID:: Request recieved: ${userFindByDto.id}`,
    );

    return await this.queryBus.execute<FindUserByIdQuery, UserFoundResponse>(
      new FindUserByIdQuery(userFindByDto),
    );
  }

  async findAllUsers(): Promise<UsersFoundResponse> {
    this.logger.info(`USER::FIND_ALL:: Request recieved`);

    return await this.queryBus.execute<FindAllUsersQuery, UsersFoundResponse>(
      new FindAllUsersQuery(),
    );
  }

  findUserByAuthId(
    userFindByAuthIdDto: UserFindByAuthIdDto,
  ): Promise<UserFoundResponse> {
    return this.queryBus.execute<FindUserByAuthIdQuery, UserFoundResponse>(
      new FindUserByAuthIdQuery(userFindByAuthIdDto),
    );
  }
}
