import { Module } from '@nestjs/common';

import { ViewsCacheService } from './cache.service';

@Module({
  providers: [ViewsCacheService],
  exports: [ViewsCacheService],
})
export class ViewsCacheModule {}
