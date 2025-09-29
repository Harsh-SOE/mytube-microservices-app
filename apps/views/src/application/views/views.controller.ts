import { Controller, UseFilters } from '@nestjs/common';
import { Observable } from 'rxjs';

import { GrpcAppExceptionFilter } from '@app/utils';
import {
  ViewsVideoDto,
  ViewsVideoResponse,
  ViewsServiceController,
  ViewsServiceControllerMethods,
} from '@app/contracts/views';

import { WatchService } from './views.service';

@Controller()
@UseFilters(GrpcAppExceptionFilter)
@ViewsServiceControllerMethods()
export class ViewsController implements ViewsServiceController {
  public constructor(private readonly watchService: WatchService) {}

  viewVideo(
    watchVideoDto: ViewsVideoDto,
  ):
    | Promise<ViewsVideoResponse>
    | Observable<ViewsVideoResponse>
    | ViewsVideoResponse {
    console.log(
      `Request recieved by watch service: ${JSON.stringify(watchVideoDto)}`,
    );
    return this.watchService.watchVideo(watchVideoDto);
  }
}
