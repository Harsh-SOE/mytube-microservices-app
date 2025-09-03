import { Module } from '@nestjs/common';

import { AppConfigModule } from '@likes/config';
import { CacheService } from './cache.service';

@Module({
  imports: [AppConfigModule],
  providers: [CacheService],
})
export class CacheModule {}
