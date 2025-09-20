import { Controller, Param, Post, UseGuards } from '@nestjs/common';

import { JwtUserPayload } from '@app/contracts/jwt';

import { User } from '@gateway/utils/decorators';
import { GatewayJwtGuard } from '@gateway/infrastructure/jwt';

import { WATCH_API } from './api';
import { WatchService } from './watch.service';
import { WatchVideoResponse } from './response';

@Controller('watch')
@UseGuards(GatewayJwtGuard)
export class WatchController {
  constructor(private watchService: WatchService) {}

  @Post(WATCH_API.WATCH_VIDEO)
  watchVideo(
    @Param('videoId') videoId: string,
    @User() user: JwtUserPayload,
  ): Promise<WatchVideoResponse> {
    console.log(`Request recieved for video: ${videoId}`);
    return this.watchService.watchVideo(videoId, user.id);
  }
}
