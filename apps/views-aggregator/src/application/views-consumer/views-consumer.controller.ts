import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { WatchMessage } from '@views-aggregator/types';

import { ViewsConsumerService } from './views-consumer.service';

@Controller()
export class ViewsConsumerController {
  public constructor(private ViewsService: ViewsConsumerService) {}

  @EventPattern('video.watched')
  public watchVideo(@Payload() message: WatchMessage) {
    console.log(`message is ${JSON.stringify(message)}`);
    return this.ViewsService.onWatch(message);
  }
}
