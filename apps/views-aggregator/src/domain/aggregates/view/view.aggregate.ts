import { AggregateRoot } from '@nestjs/cqrs';
import { ViewEntity } from '@views-aggregator/domain/entities';

export class ViewAggregate extends AggregateRoot {
  public constructor(private viewEntity: ViewEntity) {
    super();
  }

  public getEntity() {
    return this.viewEntity;
  }

  public getSnapshot() {
    return this.viewEntity.getSnapshot();
  }
}
