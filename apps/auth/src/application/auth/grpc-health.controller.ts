import {
  HealthCheckRequest,
  HealthCheckResponse,
  HealthCheckResponse_ServingStatus,
  HealthController,
  HealthControllerMethods,
} from '@app/contracts/health';
import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';

@Controller()
@HealthControllerMethods()
export class GrpcHealthController implements HealthController {
  check(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    request: HealthCheckRequest,
  ):
    | Promise<HealthCheckResponse>
    | Observable<HealthCheckResponse>
    | HealthCheckResponse {
    return { status: HealthCheckResponse_ServingStatus.SERVING }; // 1 = SERVING
  }
}
