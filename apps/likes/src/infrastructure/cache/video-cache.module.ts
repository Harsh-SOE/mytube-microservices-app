import { Module } from '@nestjs/common';

import { AppConfigModule } from '@likes/config';

import { VideoCacheService } from './video-cache.service';

@Module({
  imports: [AppConfigModule],
  providers: [VideoCacheService],
  exports: [VideoCacheService],
})
export class VideoCacheModule {}
