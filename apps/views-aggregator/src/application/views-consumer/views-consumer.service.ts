import { Injectable } from '@nestjs/common';

import { WatchMessage } from '@views-aggregator/types';

@Injectable()
export class ViewsConsumerService {
  onWatch(message: WatchMessage) {
    console.log(`Messsage is`, message);
  }
}
