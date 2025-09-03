import { InvalidDomainInputException } from '@app/errors';
import z from 'zod';

export class VideoUrl {
  private static VideoUrlValidationSchema = z.string();

  public constructor(private readonly value: string) {}

  public static create(value: string) {
    const parsedVideoUrl = this.VideoUrlValidationSchema.safeParse(value);
    if (!parsedVideoUrl.success) {
      const errorMessage = parsedVideoUrl.error.message;
      throw new InvalidDomainInputException(
        `VideoUrl validation has failed. Reason: ${errorMessage}`,
      );
    }
    return new VideoUrl(parsedVideoUrl.data);
  }

  public getValue() {
    return this.value;
  }
}
