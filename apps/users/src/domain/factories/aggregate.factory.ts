export interface AggregateFactory<TAggregate> {
  create(...args: any): TAggregate;
}
