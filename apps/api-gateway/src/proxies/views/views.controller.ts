import { Controller, Param, Post, UseGuards } from '@nestjs/common';

import { User } from '@gateway/proxies/auth/decorators';
import { GatewayJwtGuard } from '@gateway/proxies/auth/guards';

import { UserAuthPayload } from '@app/contracts/auth';

import { VIEWS_API } from './api';
import { WatchService } from './views.service';
import { ViewsVideoResponse } from './response';

@Controller('view')
@UseGuards(GatewayJwtGuard)
export class WatchController {
  constructor(private watchService: WatchService) {}

  @Post(VIEWS_API.VIEW_VIDEO)
  watchVideo(
    @Param('videoId') videoId: string,
    @User() user: UserAuthPayload,
  ): Promise<ViewsVideoResponse> {
    console.log(`Request recieved for video: ${videoId}`);
    return this.watchService.watchVideo(videoId, user.id);
  }
}
