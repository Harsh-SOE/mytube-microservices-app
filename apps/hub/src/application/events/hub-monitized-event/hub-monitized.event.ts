import { HubAggregate } from '@hub/domain/aggregates';

export class HubMonitizedEvent {
  public constructor(public readonly hubAggregate: HubAggregate) {}
}
