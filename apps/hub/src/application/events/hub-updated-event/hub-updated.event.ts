import { HubAggregate } from '@hub/domain/aggregates';

export class HubUpdatedEvent {
  public constructor(public readonly hubAggregate: HubAggregate) {}
}
