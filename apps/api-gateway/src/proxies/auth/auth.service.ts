import { Response } from 'express';
import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { JwtService } from '@nestjs/jwt';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { firstValueFrom } from 'rxjs';
import { Counter } from 'prom-client';

import { CLIENT_PROVIDER } from '@app/clients/constant';
import { USER_SERVICE_NAME, UserServiceClient } from '@app/contracts/users';
import { UserAuthPayload } from '@app/contracts/auth';

import { LOGGER_PORT, LoggerPort } from '@gateway/application/ports';
import { REQUESTS_COUNTER } from '@gateway/infrastructure/measure';
import { Auth0ProfileUser } from '@gateway/proxies/auth/types';

@Injectable()
export class AuthService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(
    @Inject(CLIENT_PROVIDER.USER) private readonly userClient: ClientGrpc,
    @Inject(LOGGER_PORT) private readonly logger: LoggerPort,
    @InjectMetric(REQUESTS_COUNTER) private readonly counter: Counter,
    private readonly jwtService: JwtService,
  ) {}

  onModuleInit() {
    this.userService = this.userClient.getService(USER_SERVICE_NAME);
  }

  async onAuthRedirect(
    userAuthCredentials: Auth0ProfileUser,
    response: Response,
  ): Promise<void> {
    this.logger.info(
      `User Auth Credentials are: ${JSON.stringify(userAuthCredentials)}`,
    );

    if (!userAuthCredentials.providerId) {
      throw new Error(`No Provider was found...`);
    }

    const response$ = this.userService.findUserByAuthId({
      authId: userAuthCredentials.providerId,
    });
    const userFoundResponse = await firstValueFrom(response$);

    const foundUser = userFoundResponse.user;

    if (!foundUser) {
      this.logger.info(`No User found in user's database...`);

      const cookiePayload = {
        response:
          'Please complete your profile inorder to login to application [STATUS: Signup-SUCCESS]',
        token: undefined,
        userAuthCred: {
          email: userAuthCredentials.email,
          authId: userAuthCredentials.providerId,
        },
      };
      response.cookie('onboarding_info', JSON.stringify(cookiePayload), {
        httpOnly: false,
        secure: false,
        sameSite: 'lax',
        path: '/',
        maxAge: 1000 * 60 * 5,
      });

      return response.redirect('http://localhost:4545/onboard');
    }

    const authUserPayload: UserAuthPayload = {
      id: foundUser.id,
      authId: userAuthCredentials.providerId,
      email: foundUser.email,
      handle: foundUser.handle,
    };

    const cookiePayload = {
      response: 'user logged in successfully',
      token: this.jwtService.sign(authUserPayload),
      userAuthCred: userAuthCredentials,
    };

    response.cookie('user_info', JSON.stringify(cookiePayload), {
      httpOnly: false,
      secure: false,
      sameSite: 'lax',
      path: '/',
      maxAge: 1000 * 60 * 5,
    });

    return response.redirect('http://localhost:4545/homepage');
  }
}
