import { InvalidDomainInputException } from '@app/errors';
import z from 'zod';

export class VideoOwner {
  private static VideoOwnerIdValidationSchema = z.uuid();

  public constructor(private readonly value: string) {}

  public static create(value: string) {
    const parsedVideoOwnerId =
      this.VideoOwnerIdValidationSchema.safeParse(value);
    if (!parsedVideoOwnerId.success) {
      const errorMessage = parsedVideoOwnerId.error.message;
      throw new InvalidDomainInputException(
        `VideoOwnerId validation has failed. Reason: ${errorMessage}`,
      );
    }
    return new VideoOwner(parsedVideoOwnerId.data);
  }

  public getValue(): string {
    return this.value;
  }
}
