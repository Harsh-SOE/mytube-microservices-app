/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Inject,
  Injectable,
  NotImplementedException,
  OnModuleInit,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import winston from 'winston';
import { Counter } from 'prom-client';
import { firstValueFrom } from 'rxjs';

import { USER_SERVICE_NAME, UserServiceClient } from '@app/contracts/users';
import { CLIENT_PROVIDER, WINSTON_LOGGER } from '@app/clients/constant';
import { UserAuthPayload } from '@app/contracts/auth';

import { REQUESTS_COUNTER } from '@gateway/infrastructure/measure';

import { SaveUserProfileDto, UpdateUserRequestDto } from './request';
import {
  DeleteUserRequestResponse,
  FindUserRequestResponse,
  UpdatedUserRequestResponse,
} from './response';

@Injectable()
export class UsersService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(
    @Inject(CLIENT_PROVIDER.USER) private readonly userClient: ClientGrpc,
    @Inject(WINSTON_LOGGER) private readonly logger: winston.Logger,
    @InjectMetric(REQUESTS_COUNTER) private readonly counter: Counter,
    private jwtService: JwtService,
  ) {}

  onModuleInit() {
    this.userService = this.userClient.getService(USER_SERVICE_NAME);
  }

  async saveUserInDatabase(saveUserProfileDto: SaveUserProfileDto) {
    const response$ = this.userService.createProfile({
      authId: saveUserProfileDto.authId,
      email: saveUserProfileDto.email,
      handle: saveUserProfileDto.handle,
    });
    const createdUserProfile = await firstValueFrom(response$);
    const userPayload: UserAuthPayload = {
      id: createdUserProfile.userId,
      email: saveUserProfileDto.email,
      authId: saveUserProfileDto.authId,
      handle: saveUserProfileDto.handle,
    };
    return { token: this.jwtService.sign(userPayload) };
  }

  async updateUserDetails(
    userId: string,
    userUpdateDto: UpdateUserRequestDto,
  ): Promise<UpdatedUserRequestResponse> {
    this.counter.inc();

    this.logger.log(
      'info',
      `GATEWAY::UPDATE_USER:: Update Request has been made:${JSON.stringify(userUpdateDto)}`,
    );

    const response$ = this.userService.updateProfile({
      ...userUpdateDto,
      id: userId,
    });
    return await firstValueFrom(response$);
  }

  deleteUser(user: UserAuthPayload): Promise<DeleteUserRequestResponse> {
    // INFO: NOT IMPLEMENTED: Implement saga distributed transaction
    throw new NotImplementedException(`Delete user is not yet implemented!`);
  }

  async getCurrentlyLoggedInUser(id: string): Promise<FindUserRequestResponse> {
    this.counter.inc();

    this.logger.log('info', `GATEWAY::GET_LOGGED_IN_USER:: UserId:${id}`);

    const response$ = this.userService.findOneUserById({ id });
    const response = await firstValueFrom(response$);
    return response;
  }

  async getAllRegisteredUser(): Promise<FindUserRequestResponse[]> {
    this.logger.log(
      'info',
      `GATEWAY::GET_ALL_USERS:: All users will be fetched`,
    );

    const response$ = this.userService.findAllUsers({});
    const users = (await firstValueFrom(response$)).userFoundResponse;
    return users;
  }
}
