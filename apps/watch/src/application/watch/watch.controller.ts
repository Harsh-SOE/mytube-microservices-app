import { Controller, UseFilters } from '@nestjs/common';
import { Observable } from 'rxjs';

import { GrpcAppExceptionFilter } from '@app/utils';
import {
  WatchServiceController,
  WatchServiceControllerMethods,
  WatchVideoDto,
  WatchVideoResponse,
} from '@app/contracts/watch';

import { WatchService } from './watch.service';

@Controller()
@UseFilters(GrpcAppExceptionFilter)
@WatchServiceControllerMethods()
export class WatchController implements WatchServiceController {
  public constructor(private readonly watchService: WatchService) {}

  watchVideo(
    watchVideoDto: WatchVideoDto,
  ):
    | Promise<WatchVideoResponse>
    | Observable<WatchVideoResponse>
    | WatchVideoResponse {
    return this.watchService.watchVideo(watchVideoDto);
  }
}
