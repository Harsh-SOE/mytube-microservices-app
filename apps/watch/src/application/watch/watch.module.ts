import { Module } from '@nestjs/common';

import { WatchController } from './watch.controller';
import { WatchService } from './watch.service';

@Module({
  controllers: [WatchController],
  providers: [WatchService],
})
export class WatchModule {}
