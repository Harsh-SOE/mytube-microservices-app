import { ChannelAggregate } from '@channel/domain/aggregates';

export class ChannelUpdatedEvent {
  public constructor(public readonly channelAggregate: ChannelAggregate) {}
}
