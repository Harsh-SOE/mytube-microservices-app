import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import argon from 'argon2';
import { firstValueFrom } from 'rxjs';
import { Logger } from 'winston';
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
  ProviderTransport,
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
  IncorrectPasswordException,
  UserCredentialNotFoundException,
} from '../errors';

@Injectable()
export class AuthService implements OnModuleInit {
  private userService: UserServiceClient;

  /**
   * Constructor for AuthService
   * @param {ClientGrpc} userClient - Grpc client for User Service
   * @param {winston.Logger} logger - Logger instance
   * @param {UserAuthRepository} authUserRepository - Repository for user authentication
   * @param {JwtService} jwtService - Service for JWT generation and verification
   */
  constructor(
    @Inject(CLIENT_PROVIDER.USER) private readonly userClient: ClientGrpc,
    @Inject(WINSTON_LOGGER) private readonly logger: Logger,
    private readonly authUserRepository: UserAuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  /**
   * Initializes the AuthService by setting the UserServiceClient instance.
   */
  onModuleInit() {
    this.userService = this.userClient.getService(USER_SERVICE_NAME);
  }

  /**
   * Hashes a given password using argonjs
   * @param {string} password - The password to be hashed
   * @returns {Promise<string>} - A promise that resolves with the hashed password
   */
  @LogExecutionTime()
  async hashPassword(password: string): Promise<string> {
    const hashedPassword = await argon.hash(password);
    return hashedPassword;
  }

  /**
   * Verifies if a given password matches the stored password hash for a user.
   * @param {string} enteredPassword - The password to be verified
   * @param {string} userId - The ID of the user to verify the password for
   * @returns {Promise<boolean>} - A promise that resolves with true if the password is correct, throws otherwise
   * @throws {UserCredentialNotFoundException} - If the user with the given ID is not found
   * @throws {IncorrectPasswordException} - If the given password does not match the stored password hash for the user
   */
  @LogExecutionTime()
  async verifyPasswords(
    enteredPassword: string,
    userId: string,
  ): Promise<boolean> {
    const foundUser = await this.authUserRepository.FindOneUser({ userId });
    if (!foundUser) {
      const error = new UserCredentialNotFoundException(
        `User with id:${userId} not found`,
      );
      throw error;
    }
    const isPasswordCorrect = await argon.verify(
      foundUser.userPasswordHash as string,
      enteredPassword,
    );
    if (!isPasswordCorrect) {
      throw new IncorrectPasswordException(
        `Incorrect password for user with id:${userId}`,
      );
    }
    return true;
  }

  /**
   * Verify a given user token.
   * @param {string} userToken - The user token to verify
   * @returns {Promise<JwtUserPayload>} - A promise that resolves with the verified user payload if the token is valid, throws otherwise
   */
  @LogExecutionTime()
  async verifyToken(userToken: string): Promise<JwtUserPayload> {
    return this.jwtService.verify(userToken);
  }

  /**
   * Signs up a new user using the provided AuthSignupDto.
   * This Auth.signup service will just be saving the user signin credentials in the auth database
   * @param {AuthSignupDto} authSignupDto - The user signup dto.
   * @returns {Promise<AuthSignupResponse>} - A promise that resolves with the signup response.
   */
  async signup(authSignupDto: AuthSignupDto): Promise<AuthSignupResponse> {
    this.logger.log(
      'info',
      `AUTH:SIGNUP: Request was recieved: ${JSON.stringify(authSignupDto)}`,
    );

    const userId = uuidv4();
    const authCredId = uuidv4();

    if (authSignupDto.provider === ProviderTransport.TRANSPORT_LOCAL) {
      const hasedPassword = await this.hashPassword(
        authSignupDto.password as string,
      );
      const userId = uuidv4();
      const authCredId = uuidv4();

      await this.authUserRepository.saveUserCredentials({
        _id: authCredId,
        provider: authSignupDto.provider,
        userId,
        userPasswordHash: hasedPassword,
      });
    } else {
      await this.authUserRepository.saveUserCredentials({
        _id: authCredId,
        provider: authSignupDto.provider,
        providerId: authSignupDto.providerId,
        userId,
      });
    }

    const userCreateDto: UserSignupDto = {
      id: userId,
      userName: authSignupDto.userName,
      email: authSignupDto.email,
      fullName: authSignupDto.fullName,
      dob: authSignupDto.dob,
      avatar: authSignupDto.avatar,
      coverImage: authSignupDto.coverImage,
    };

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
    const updatedPasswordResponse =
      await this.authUserRepository.updateSigninPasswordById(
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

    await this.authUserRepository.deleteUserCredentials({
      userId: authDeleteUserCredentialsDto.id,
    });
    return { response: 'deletion successful' };
  }
}
