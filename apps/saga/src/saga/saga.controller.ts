import { Controller, UseFilters } from '@nestjs/common';

import {
  SagaHealthCheckRequest,
  SagaHealthCheckResponse,
  SagaServiceController,
  SagaServiceControllerMethods,
  SagaSignupDto,
  SagaSignupResponse,
} from '@app/contracts/saga';

import { SagaService } from './saga.service';
import { SagaExceptionFilter } from '../filters';
import { Observable } from 'rxjs';

@UseFilters(SagaExceptionFilter)
@SagaServiceControllerMethods()
@Controller()
export class SagaController implements SagaServiceController {
  constructor(private readonly sagaService: SagaService) {}

  check(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: SagaHealthCheckRequest,
  ):
    | Promise<SagaHealthCheckResponse>
    | Observable<SagaHealthCheckResponse>
    | SagaHealthCheckResponse {
    return { status: 1 }; // 1 = SERVING
  }

  userSignupFlow(
    authSignupUserDto: SagaSignupDto,
  ): Promise<SagaSignupResponse> {
    console.log(`Request recieved`);
    return this.sagaService.userSignupFlow(authSignupUserDto);
  }
}
