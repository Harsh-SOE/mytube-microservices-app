import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import winston from 'winston';

import { CLIENT_PROVIDER, WINSTON_LOGGER } from '@app/clients/constant';

import { REQUESTS_COUNTER } from '@gateway/infrastructure/measure';
import { USER_PACKAGE_NAME, UserServiceClient } from '@app/contracts/users';
import { Auth0ProfileUser } from '@gateway/infrastructure/auth/payloads';
import { firstValueFrom } from 'rxjs';
import { UserAuthPayload } from '@app/contracts/auth';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService implements OnModuleInit {
  private userService: UserServiceClient;

  constructor(
    @Inject(CLIENT_PROVIDER.USER) private readonly userClient: ClientGrpc,
    @Inject(WINSTON_LOGGER) private readonly logger: winston.Logger,
    @InjectMetric(REQUESTS_COUNTER) private readonly counter: Counter,
    private readonly jwtService: JwtService,
  ) {}

  onModuleInit() {
    this.userService =
      this.userClient.getService<UserServiceClient>(USER_PACKAGE_NAME);
  }

  async onAuthRedirect(userAuthCredentials: Auth0ProfileUser): Promise<{
    response: string;
    token: string | undefined;
    userAuthCred: Auth0ProfileUser;
  }> {
    const response$ = this.userService.findUserByAuthId({
      authId: userAuthCredentials.providerId,
    });
    const user = await firstValueFrom(response$);

    if (!user) {
      return {
        response: 'Please create a profile inorder to continue',
        token: undefined,
        userAuthCred: userAuthCredentials,
      };
    }

    const authUserPayload: UserAuthPayload = {
      id: user.id,
      authId: userAuthCredentials.providerId,
      email: user.email,
      handle: user.handle,
    };
    return {
      response: 'user logged in successfully',
      token: this.jwtService.sign(authUserPayload),
      userAuthCred: userAuthCredentials, // for testing purpose...
    };
  }
}
