import { HubAggregate } from '@hub/domain/aggregates';

export class HubCreatedEvent {
  public constructor(public readonly hubCreatedEventDto: HubAggregate) {}
}
