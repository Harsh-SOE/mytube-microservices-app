import { Inject, Injectable, OnModuleInit } from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';

import { SagaSignupDto, SagaSignupResponse } from '@app/contracts/saga';
import { CLIENT_PROVIDER } from '@app/clients/constant';

@Injectable()
export class SagaService implements OnModuleInit {
  constructor(
    @Inject(CLIENT_PROVIDER.USER) private readonly userClient: ClientGrpc,
  ) {}

  onModuleInit() {}

  userSignupFlow(sagaSignupDto: SagaSignupDto): SagaSignupResponse {
    console.log(sagaSignupDto);
    return { response: 'Response', userId: '123654' };
  }
}
