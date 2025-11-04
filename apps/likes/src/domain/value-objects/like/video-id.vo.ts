import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

import { InvalidVideoIdException } from '@likes/domain/exceptions';

export class VideoId {
  private static VideoIdValidationSchema = z.uuid();

  public constructor(private readonly value: string) {}

  public static create(value?: string): VideoId {
    if (!value) return new VideoId(uuidv4());

    const parsedVideoId = this.VideoIdValidationSchema.safeParse(value);
    if (!parsedVideoId.success) {
      throw new InvalidVideoIdException({
        message: `An error occured while validating the videoId: ${value}`,
        meta: parsedVideoId.error,
      });
    }
    return new VideoId(parsedVideoId.data);
  }

  public getValue(): string {
    return this.value;
  }
}
