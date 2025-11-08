import { uuid } from 'zod';

import { InvalidVideoIdException } from '@comments/domain/exceptions';

export class VideoId {
  private static VideoIdValidationSchema = uuid();

  public constructor(private value: string) {}

  public static create(value: string) {
    const userIdParsedValue = VideoId.VideoIdValidationSchema.safeParse(value);
    if (!userIdParsedValue.success) {
      const message = userIdParsedValue.error.message;
      throw new InvalidVideoIdException({
        message: `Comment text has failed validation. Reason: ${message}`,
      });
    }
    return new VideoId(userIdParsedValue.data);
  }

  public getValue(): string {
    return this.value;
  }
}
