import { Controller, Param, Post, UseGuards } from '@nestjs/common';
import { WATCH_API } from './api';
import { User } from '@gateway/decorators';
import { JwtUserPayload } from '@app/contracts/jwt';
import { GatewayJwtGuard } from '@gateway/jwt/guards';
import { WatchService } from './watch.service';

@Controller('watch')
@UseGuards(GatewayJwtGuard)
export class WatchController {
  constructor(private watchService: WatchService) {}

  @Post(WATCH_API.WATCH_VIDEO)
  watchVideo(@Param('video-id') videoId: string, @User() user: JwtUserPayload) {
    return this.watchService.watchVideo(videoId, user.id);
  }
}
