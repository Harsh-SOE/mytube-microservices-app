import { Controller, UseFilters } from '@nestjs/common';
import { Observable } from 'rxjs';

import { GrpcAppExceptionFilter } from '@app/utils';

import {
  ViewsVideoDto,
  ViewsVideoResponse,
  ViewsServiceController,
  ViewsServiceControllerMethods,
} from '@app/contracts/views';

import { GrpcService } from './grpc.service';

@Controller()
@UseFilters(GrpcAppExceptionFilter)
@ViewsServiceControllerMethods()
export class GrpcController implements ViewsServiceController {
  public constructor(private readonly watchService: GrpcService) {}

  viewVideo(
    watchVideoDto: ViewsVideoDto,
  ):
    | Promise<ViewsVideoResponse>
    | Observable<ViewsVideoResponse>
    | ViewsVideoResponse {
    return this.watchService.watchVideo(watchVideoDto);
  }
}
