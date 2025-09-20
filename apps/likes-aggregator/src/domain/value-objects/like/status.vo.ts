import { z } from 'zod';
import { LikeDomainStatus } from '../../domain-enums';

export class LikeStatus {
  private static VideoStatusValidationSchema = z.enum(LikeDomainStatus);

  public constructor(private value: LikeDomainStatus) {}

  public static create(value: string): LikeStatus {
    const parsedVideoStatus = this.VideoStatusValidationSchema.safeParse(value);
    if (!parsedVideoStatus.success) {
      const errorMessage = parsedVideoStatus.error.message;
      throw new Error(
        `An error occured while validating the VideoStatus. Reason: ${errorMessage}`,
      );
    }
    return new LikeStatus(parsedVideoStatus.data);
  }

  public getValue(): LikeDomainStatus {
    return this.value;
  }
}
