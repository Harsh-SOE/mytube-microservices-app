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

  async onAuthRedirect(userAuthCredentials: Auth0ProfileUser): Promise<{
    response: string;
    token: string | undefined;
    userAuthCred: Auth0ProfileUser;
  }> {
    this.logger.info(
      `User Auth Credentials are: ${JSON.stringify(userAuthCredentials)}`,
    );

    const response$ = this.userService.findUserByAuthId({
      authId: userAuthCredentials.providerId,
    });
    const userInDatabase = await firstValueFrom(response$);

    if (!userInDatabase) {
      return {
        response:
          'Please complete your profile inorder to login to application [STATUS: Signup-SUCCESS]',
        token: undefined,
        userAuthCred: userAuthCredentials,
      };
    }

    const authUserPayload: UserAuthPayload = {
      id: userInDatabase.id,
      authId: userAuthCredentials.providerId,
      email: userInDatabase.email,
      handle: userInDatabase.handle,
    };
    return {
      response: 'user logged in successfully',
      token: this.jwtService.sign(authUserPayload),
      userAuthCred: userAuthCredentials,
    };
  }
}
