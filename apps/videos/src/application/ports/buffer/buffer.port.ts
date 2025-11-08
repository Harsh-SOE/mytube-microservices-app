import { VideoAggregate } from '@videos/domain/aggregates';

export interface BufferPort {
  bufferVideo(video: VideoAggregate): Promise<void>;

  processVideosBatch(): Promise<number | void>;
}

export const BUFFER_PORT = Symbol('BUFFER_PORT');
