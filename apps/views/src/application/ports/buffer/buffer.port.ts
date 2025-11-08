import { ViewAggregate } from '@views/domain/aggregates';

export interface BufferPort {
  bufferView(view: ViewAggregate): Promise<void>;

  processViewsBatch(): Promise<number | void>;
}

export const BUFFER_PORT = Symbol('BUFFER_PORT');
