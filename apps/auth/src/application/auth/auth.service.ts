import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientGrpc } from '@nestjs/microservices';
import * as bcrypt from 'bcryptjs';
import { firstValueFrom } from 'rxjs';
import winston from 'winston';
import { v4 as uuidv4 } from 'uuid';

import {
  AuthSignupDto,
  AuthSignupResponse,
  AuthSigninDto,
  AuthSigninResponse,
  AuthChangePasswordDto,
  AuthChangePasswordResponse,
  AuthDeleteUserCredentialsResponse,
  AuthDeleteUserCredentialsDto,
} from '@app/contracts/auth';
import {
  UserSignupDto,
  UserServiceClient,
  USER_SERVICE_NAME,
} from '@app/contracts/users';
import { JwtUserPayload } from '@app/contracts/jwt';
import { LogExecutionTime } from '@app/utils';
import { CLIENT_PROVIDER, WINSTON_LOGGER } from '@app/clients/constant';

import { UserAuthRepository } from '@auth/infrastructure/repository';

import {
  IncorrectUserPasswordGrpcException,
  UserCredentialNotFoundGrpcException,
} from '../errors';

@Injectable()
export class AuthService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(
    @Inject(CLIENT_PROVIDER.USER) private readonly userClient: ClientGrpc,
    @Inject(WINSTON_LOGGER) private readonly logger: winston.Logger,
    private readonly authUser: UserAuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  onModuleInit() {
    this.userService = this.userClient.getService(USER_SERVICE_NAME);
  }

  @LogExecutionTime()
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    return hashedPassword;
  }

  @LogExecutionTime()
  async verifyPasswords(
    enteredPassword: string,
    userId: string,
  ): Promise<void> {
    const foundUser = await this.authUser.findOne({ userId });
    if (!foundUser) {
      const error = new UserCredentialNotFoundGrpcException(
        `User with id:${userId} not found`,
      );
      console.log(`--->`, error);
      throw error;
    }
    const isPasswordCorrect = await bcrypt.compare(
      enteredPassword,
      foundUser.userPasswordHash,
    );
    if (!isPasswordCorrect) {
      console.log(`Incorrect password`);
      const error = new IncorrectUserPasswordGrpcException(
        `Incorrect password for user with id:${userId}`,
      );
      console.log(error);
      throw error;
    }
  }

  async verifyToken(userToken: string): Promise<JwtUserPayload> {
    return this.jwtService.verify(userToken);
  }

  async signup(authSignupDto: AuthSignupDto): Promise<AuthSignupResponse> {
    this.logger.log(
      'info',
      `AUTH:SIGNUP: Request was recieved: ${JSON.stringify(authSignupDto)}`,
    );

    console.log(`Request in auth`);

    const hasedPassword = await this.hashPassword(authSignupDto.password);

    // generate the id for the user
    const userId = uuidv4();
    // generate the id for user credentials
    const authCredId = uuidv4();

    await this.authUser.create({
      _id: authCredId,
      userId,
      userPasswordHash: hasedPassword,
    });

    const userCreateDto: UserSignupDto = {
      id: userId,
      userName: authSignupDto.userName,
      email: authSignupDto.email,
      fullName: authSignupDto.fullName,
      dob: authSignupDto.dob,
      avatar: authSignupDto.avatar,
      coverImage: authSignupDto.coverImage,
    };

    console.log(userCreateDto);

    return userCreateDto;
  }

  async signin(authLoginDto: AuthSigninDto): Promise<AuthSigninResponse> {
    const foundUser$ = this.userService.login({
      userName: authLoginDto.userName,
    });

    const foundUser = await firstValueFrom(foundUser$);

    this.logger.log(
      'info',
      `AUTH::SIGNIN:: Request recieved: ${JSON.stringify(authLoginDto)}`,
    );

    await this.verifyPasswords(authLoginDto.password, foundUser.id);
    const payload: JwtUserPayload = {
      id: foundUser.id,
      userName: foundUser.userName,
      fullName: foundUser.fullName,
      email: foundUser.email,
      dob: foundUser.dob,
    };
    return { token: this.jwtService.sign(payload) };
  }

  async changePassword(
    authChangePasswordDto: AuthChangePasswordDto,
  ): Promise<AuthChangePasswordResponse> {
    this.logger.log(
      'info',
      `AUTH::CHANGE_PASSWORD:: Request recieved: ${JSON.stringify(authChangePasswordDto)}`,
    );

    const { id, oldPassword, newPassword } = authChangePasswordDto;
    await this.verifyPasswords(oldPassword, id);
    const hashedPassword = await this.hashPassword(newPassword);
    const updatedPasswordResponse = await this.authUser.updatePasswordById(
      id,
      hashedPassword,
    );
    return updatedPasswordResponse ? { response: true } : { response: false };
  }

  async deleteUserCredential(
    authDeleteUserCredentialsDto: AuthDeleteUserCredentialsDto,
  ): Promise<AuthDeleteUserCredentialsResponse> {
    this.logger.log(
      'info',
      `AUTH::DELETE_CREDENTIALS:: Request recieved: ${JSON.stringify(authDeleteUserCredentialsDto)}`,
    );

    await this.authUser.deleteOne({ userId: authDeleteUserCredentialsDto.id });
    return { response: 'deletion successful' };
  }
}
