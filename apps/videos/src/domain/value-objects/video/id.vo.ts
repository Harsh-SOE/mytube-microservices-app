import z from 'zod';
import { v4 as uuidv4 } from 'uuid';

import { InvalidVideoIdException } from '@videos/domain/exceptions';

export class VideoId {
  private static VideoIdValidationSchema = z.uuid();

  public constructor(private readonly value: string) {}

  public static create(value?: string) {
    if (!value) {
      return new VideoId(uuidv4());
    }

    const parsedVideoId = this.VideoIdValidationSchema.safeParse(value);

    if (!parsedVideoId.success) {
      const errorMessage = parsedVideoId.error.message;
      throw new InvalidVideoIdException({
        message: `Video id validation has failed. Reason: ${errorMessage}`,
      });
    }

    return new VideoId(parsedVideoId.data);
  }

  public getValue(): string {
    return this.value;
  }
}
