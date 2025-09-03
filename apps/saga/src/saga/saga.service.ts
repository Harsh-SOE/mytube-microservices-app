import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc, RpcException } from '@nestjs/microservices';
import { firstValueFrom, Observable } from 'rxjs';

import { SagaSignupDto, SagaSignupResponse } from '@app/contracts/saga';
import { AUTH_SERVICE_NAME, AuthServiceClient } from '@app/contracts/auth';
import { USER_SERVICE_NAME, UserServiceClient } from '@app/contracts/users';
import { CLIENT_PROVIDER, WINSTON_LOGGER } from '@app/clients/constant';
import winston from 'winston';

@Injectable()
export class SagaService implements OnModuleInit {
  private authService: AuthServiceClient;
  private userService: UserServiceClient;

  constructor(
    @Inject(CLIENT_PROVIDER.AUTH) private readonly authClient: ClientGrpc,
    @Inject(CLIENT_PROVIDER.USER) private readonly userClient: ClientGrpc,
    @Inject(WINSTON_LOGGER) private readonly logger: winston.Logger,
  ) {}

  onModuleInit() {
    this.authService = this.authClient.getService(AUTH_SERVICE_NAME);
    this.userService = this.userClient.getService(USER_SERVICE_NAME);
  }

  async userSignupFlow(
    sagaSignupDto: SagaSignupDto,
  ): Promise<SagaSignupResponse> {
    const compensationSteps: Array<() => Observable<any>> = [];
    this.logger.log(
      'info',
      `SAGA::USER_SIGNUP:: Request recieved: ${JSON.stringify(sagaSignupDto)}`,
    );

    try {
      const authResponse$ = this.authService.signup(sagaSignupDto);
      const authResponse = await firstValueFrom(authResponse$);
      const authCompensationstep = () =>
        this.authService.deleteUserCredentials({ id: authResponse.id });
      compensationSteps.push(authCompensationstep);
      const userResponse$ = this.userService.userSignup(authResponse);
      const userResponse = await firstValueFrom(userResponse$);
      return userResponse;
    } catch (error) {
      console.error(error);
      console.log(error instanceof RpcException);
      console.log(compensationSteps);
      for (const step of compensationSteps.reverse()) {
        try {
          await firstValueFrom(step());
        } catch (compError) {
          console.error(`Compensation step failed:`, compError);
        }
      }

      throw error;
    }
  }
}
