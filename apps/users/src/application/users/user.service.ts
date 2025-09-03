import { Inject, Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { Logger } from 'winston';

import { WINSTON_LOGGER } from '@app/clients/constant';

import {
  SignupUserCommand,
  UpdateUserProfileCommand,
} from '@users/application/commands';

import {
  FindAllUsersQuery,
  FindUserByIdQuery,
  LoginSearchQuery,
} from '@users/application/queries';

import {
  UserFindByIdDto,
  UserFoundResponse,
  UserLoginDto,
  UserLoginResponse,
  UsersFoundResponse,
  UserSignupDto,
  UserSignupResponse,
  UserUpdateDto,
  userUpdateProfileResponse,
} from '@app/contracts/users';

@Injectable()
export class UserService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
    @Inject(WINSTON_LOGGER) private logger: Logger,
  ) {}

  async signup(userCreateDto: UserSignupDto): Promise<UserSignupResponse> {
    this.logger.info(`USER::SIGNUP:: Request recieved: ${userCreateDto.id}`);

    console.log(`Creating a new account`);

    return await this.commandBus.execute<SignupUserCommand, UserSignupResponse>(
      new SignupUserCommand(userCreateDto),
    );
  }

  async login(userLoginDto: UserLoginDto): Promise<UserLoginResponse> {
    this.logger.info(
      `USER::LOGIN:: Request recieved: ${userLoginDto.userName}`,
    );

    return await this.queryBus.execute<LoginSearchQuery, UserLoginResponse>(
      new LoginSearchQuery(userLoginDto),
    );
  }

  async updateProfile(
    userUpdateDto: UserUpdateDto,
  ): Promise<userUpdateProfileResponse> {
    this.logger.info(
      `USER::UPDATE_PROFILE:: Request recieved: ${userUpdateDto.id}`,
    );

    return await this.commandBus.execute<
      UpdateUserProfileCommand,
      userUpdateProfileResponse
    >(new UpdateUserProfileCommand(userUpdateDto));
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
}
