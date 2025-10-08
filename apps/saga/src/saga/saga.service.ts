import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import { SagaSignupDto, SagaSignupResponse } from '@app/contracts/saga';
import { CLIENT_PROVIDER, WINSTON_LOGGER } from '@app/clients/constant';
import winston from 'winston';

@Injectable()
export class SagaService implements OnModuleInit {
  constructor(
    @Inject(CLIENT_PROVIDER.USER) private readonly userClient: ClientGrpc,
    @Inject(WINSTON_LOGGER) private readonly logger: winston.Logger,
  ) {}

  onModuleInit() {}

  userSignupFlow(sagaSignupDto: SagaSignupDto): SagaSignupResponse {
    this.logger.log(
      'info',
      `SAGA::USER_SIGNUP:: Request recieved: ${JSON.stringify(sagaSignupDto)}`,
    );
    return { response: 'Response', userId: '123654' };
  }
}
