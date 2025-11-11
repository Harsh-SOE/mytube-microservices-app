import { ChannelAggregate } from '@channel/domain/aggregates';

export class ChannelMonitizedEvent {
  public constructor(public readonly channelAggregate: ChannelAggregate) {}
}
