import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { InjectMetric } from '@willsoto/nestjs-prometheus';
import { Counter } from 'prom-client';
import winston from 'winston';
import { firstValueFrom } from 'rxjs';

import { AuthServiceClient, AUTH_SERVICE_NAME } from '@app/contracts/auth';
import { CLIENT_PROVIDER, WINSTON_LOGGER } from '@app/clients/constant';
import { SAGA_SERVICE_NAME, SagaServiceClient } from '@app/contracts/saga';
import { LogExecutionTime } from '@app/utils';

import { REQUESTS_COUNTER } from '@gateway/infrastructure/measure';

import {
  GoogleSignupRequestDto,
  SigninRequestDTO,
  ChangePasswordRequestDto,
  LocalSignupRequestDto,
} from './request';
import {
  ChangePasswordRequestResponse,
  SigninRequestResponse,
  SignupRequestResponse,
} from './response';
import { ClientGrpcProviderEnumMapper } from './mappers/client-grpc';

@Injectable()
export class AuthService implements OnModuleInit {
  private authService: AuthServiceClient;
  private sagaService: SagaServiceClient;

  constructor(
    @Inject(CLIENT_PROVIDER.AUTH) private readonly authClient: ClientGrpc,
    @Inject(CLIENT_PROVIDER.SAGA) private readonly sagaClient: ClientGrpc,
    @Inject(WINSTON_LOGGER) private readonly logger: winston.Logger,
    @InjectMetric(REQUESTS_COUNTER) private readonly counter: Counter,
  ) {}

  onModuleInit() {
    this.authService =
      this.authClient.getService<AuthServiceClient>(AUTH_SERVICE_NAME);
    this.sagaService =
      this.sagaClient.getService<SagaServiceClient>(SAGA_SERVICE_NAME);
  }

  @LogExecutionTime()
  async signup(
    signupRequestDto: GoogleSignupRequestDto,
  ): Promise<SignupRequestResponse> {
    this.counter.inc();

    this.logger.log(
      'info',
      `GATEWAY::SIGNUP:: Request recieved:${signupRequestDto.userName}`,
    );

    const authServiceProvider = ClientGrpcProviderEnumMapper.get(
      signupRequestDto.provider,
    );

    if (authServiceProvider === undefined) {
      throw new Error(`Invalid provider...`);
    }

    const response$ = this.sagaService.userSignupFlow({
      ...signupRequestDto,
      provider: authServiceProvider,
    });

    const response = await firstValueFrom(response$);
    console.log(`response is ${JSON.stringify(response)}`);
    return response;
  }

  @LogExecutionTime()
  async signupLocal(
    localSignupRequestDto: LocalSignupRequestDto,
  ): Promise<SignupRequestResponse> {
    this.counter.inc();

    this.logger.log(
      'info',
      `GATEWAY::SIGNUP:: Request recieved:${localSignupRequestDto.userName}`,
    );

    const authServiceProvider = ClientGrpcProviderEnumMapper.get(
      localSignupRequestDto.provider,
    );

    if (authServiceProvider === undefined) {
      throw new Error(`Invalid provider...`);
    }

    const response$ = this.sagaService.userSignupFlow({
      ...localSignupRequestDto,
      providerId: '0',
      provider: authServiceProvider,
    });

    const response = await firstValueFrom(response$);
    console.log(`response is ${JSON.stringify(response)}`);
    return response;
  }

  @LogExecutionTime()
  async signupGoogle(googleSignupRequestDto: GoogleSignupRequestDto) {
    this.counter.inc();

    this.logger.log(
      'info',
      `GATEWAY::SIGNUP:: Request recieved:${googleSignupRequestDto.userName}`,
    );

    const authServiceProvider = ClientGrpcProviderEnumMapper.get(
      googleSignupRequestDto.provider,
    );

    if (authServiceProvider === undefined) {
      throw new Error(`Invalid provider...`);
    }

    const response$ = this.sagaService.userSignupFlow({
      ...googleSignupRequestDto,
      provider: authServiceProvider,
    });

    const response = await firstValueFrom(response$);
    console.log(`response is ${JSON.stringify(response)}`);
    return response;
  }

  @LogExecutionTime()
  async signin(
    loginRequestDTO: SigninRequestDTO,
  ): Promise<SigninRequestResponse> {
    this.counter.inc();

    this.logger.log(
      'info',
      `GATEWAY::SIGNIN:: Request recieved:${loginRequestDTO.userName}`,
    );

    const response$ = this.authService.signin(loginRequestDTO);
    return await firstValueFrom(response$);
  }

  async changePassword(
    id: string,
    changePasswordDto: ChangePasswordRequestDto,
  ): Promise<ChangePasswordRequestResponse> {
    this.counter.inc();

    this.logger.log(
      'info',
      `GATEWAY::CHANGE_PASSWORD:: Request recieved:${id}`,
    );
    const response$ = this.authService.changePassword({
      id,
      ...changePasswordDto,
    });
    return await firstValueFrom(response$);
  }
}
