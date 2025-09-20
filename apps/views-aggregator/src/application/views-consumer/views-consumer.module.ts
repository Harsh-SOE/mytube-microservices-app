import { Module } from '@nestjs/common';

import { ViewsConsumerController } from './views-consumer.controller';
import { ViewsConsumerService } from './views-consumer.service';

@Module({
  controllers: [ViewsConsumerController],
  providers: [ViewsConsumerService],
})
export class ViewsConsumerModule {}
