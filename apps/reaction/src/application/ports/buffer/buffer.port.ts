import { ReactionAggregate } from '@reaction/domain/aggregates';

export interface ReactionBufferPort {
  bufferReaction(reaction: ReactionAggregate): Promise<void>;

  processReactionsBatch(): Promise<number | void>;
}

export const BUFFER_PORT = Symbol('BUFFER_PORT');
