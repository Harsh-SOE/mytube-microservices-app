import { Controller, UseFilters } from '@nestjs/common';

import {
  SagaServiceController,
  SagaServiceControllerMethods,
  SagaSignupDto,
  SagaSignupResponse,
} from '@app/contracts/saga';

import { SagaService } from './saga.service';
import { SagaExceptionFilter } from '../filters';

@UseFilters(SagaExceptionFilter)
@SagaServiceControllerMethods()
@Controller()
export class SagaController implements SagaServiceController {
  constructor(private readonly sagaService: SagaService) {}

  userSignupFlow(
    authSignupUserDto: SagaSignupDto,
  ): Promise<SagaSignupResponse> {
    console.log(`Request recieved`);
    return this.sagaService.userSignupFlow(authSignupUserDto);
  }
}
