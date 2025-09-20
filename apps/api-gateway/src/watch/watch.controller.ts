import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { WATCH_API } from './api';
import { User } from '@gateway/decorators';
import { JwtUserPayload } from '@app/contracts/jwt';
import { GatewayJwtGuard } from '@gateway/jwt/guards';
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
