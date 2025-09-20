import { Injectable } from '@nestjs/common';

import { IAggregatePersistanceACL } from '@app/infrastructure';
import { ViewAggregate } from '@views-aggregator/domain/aggregates';
import { ViewEntity } from '@views-aggregator/domain/entities';
import { UserId, VideoId } from '@views-aggregator/domain/value-objects';

import { View } from '@persistance/views-aggregator';

@Injectable()
export class ViewEntityToPeristanceACL
  implements IAggregatePersistanceACL<ViewAggregate, Omit<View, 'watchedAt'>>
{
  toEntity(persistance: Omit<View, 'watchedAt'>): ViewAggregate {
    const viewEntity = new ViewEntity(
      persistance.id,
      new UserId(persistance.userId),
      new VideoId(persistance.videoId),
    );
    return new ViewAggregate(viewEntity);
  }

  toPersistance(entity: ViewAggregate): Omit<View, 'watchedAt'> {
    return {
      id: entity.getSnapshot().id,
      userId: entity.getSnapshot().userId,
      videoId: entity.getSnapshot().videoId,
    };
  }
}
