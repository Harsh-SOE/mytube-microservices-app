import z from 'zod';

import { InvalidVideoUrlException } from '@videos/domain/exceptions';

export class VideoFileIdentifier {
  private static VideoFileIdentifierValidationSchema = z.string();

  public constructor(private readonly value: string) {}

  public static create(value: string) {
    const parsedVideoUrl =
      this.VideoFileIdentifierValidationSchema.safeParse(value);
    if (!parsedVideoUrl.success) {
      const errorMessage = parsedVideoUrl.error.message;
      throw new InvalidVideoUrlException({
        message: `Video file identifier validation has failed. Reason: ${errorMessage}`,
      });
    }
    return new VideoFileIdentifier(parsedVideoUrl.data);
  }

  public getValue() {
    return this.value;
  }
}
