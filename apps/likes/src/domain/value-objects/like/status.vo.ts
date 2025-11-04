import { z } from 'zod';

import { InvalidLikeStatusException } from '@likes/domain/exceptions';

import { LikeDomainStatus } from '../../enums';

export class LikeStatus {
  private static VideoStatusValidationSchema = z.enum(LikeDomainStatus);

  public constructor(private readonly value: LikeDomainStatus) {}

  public static create(value: string): LikeStatus {
    const parsedVideoStatus = this.VideoStatusValidationSchema.safeParse(value);
    if (!parsedVideoStatus.success) {
      throw new InvalidLikeStatusException({
        message: `An error occured while validating the LikeStatus: ${value}`,
        meta: parsedVideoStatus.error,
      });
    }
    return new LikeStatus(parsedVideoStatus.data);
  }

  public getValue(): LikeDomainStatus {
    return this.value;
  }
}
