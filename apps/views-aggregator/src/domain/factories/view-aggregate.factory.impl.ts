import { ViewAggregate } from '@views-aggregator/domain/aggregates';
import { ViewEntity } from '@views-aggregator/domain/entities';
import { UserId, VideoId } from '@views-aggregator/domain/value-objects';
import { v4 as uuidv4 } from 'uuid';

import { AggregateFactory } from './aggregate.factory';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ViewAggregateFactory implements AggregateFactory<ViewAggregate> {
  create(userId: string, videoId: string): ViewAggregate {
    const view = new ViewEntity(
      uuidv4(),
      UserId.create(userId),
      VideoId.create(videoId),
    );
    const viewAggregate = new ViewAggregate(view);
    return viewAggregate;
  }
}
