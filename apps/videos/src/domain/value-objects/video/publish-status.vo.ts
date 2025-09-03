import z from 'zod';

import { InvalidDomainInputException } from '@app/errors';

import { VideoDomainPublishStatus } from '../../enums';

export class VideoPublish {
  private static VideoPublishStatusValidationSchema = z.enum(
    VideoDomainPublishStatus,
  );

  public constructor(private readonly value: VideoDomainPublishStatus) {}

  public static create(value: string) {
    const parsedVideoPublishStatus =
      this.VideoPublishStatusValidationSchema.safeParse(value);
    if (!parsedVideoPublishStatus.success) {
      const errorMessage = parsedVideoPublishStatus.error.message;
      throw new InvalidDomainInputException(
        `VideoPublishStatus validation has failed. Reason: ${errorMessage}`,
      );
    }
    return new VideoPublish(parsedVideoPublishStatus.data);
  }

  public getValue(): VideoDomainPublishStatus {
    return this.value;
  }
}
