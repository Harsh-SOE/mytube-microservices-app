import z from 'zod';

import { InvalidVideoUrlException } from '@videos/domain/exceptions';

export class VideoUrl {
  private static VideoUrlValidationSchema = z.string();

  public constructor(private readonly value: string) {}

  public static create(value: string) {
    const parsedVideoUrl = this.VideoUrlValidationSchema.safeParse(value);
    if (!parsedVideoUrl.success) {
      const errorMessage = parsedVideoUrl.error.message;
      throw new InvalidVideoUrlException({
        message: `VideoUrl validation has failed. Reason: ${errorMessage}`,
      });
    }
    return new VideoUrl(parsedVideoUrl.data);
  }

  public getValue() {
    return this.value;
  }
}
