import z from 'zod';
import { Injectable } from '@nestjs/common';

import { InvalidCoverImageException } from '@channel/domain/exceptions';

@Injectable()
export class ChannelCoverImage {
  private static channelCoverImageValidationSchema = z.url().optional();

  public constructor(private value?: string) {}

  public static create(value?: string) {
    const parsedChannelCoverImage =
      ChannelCoverImage.channelCoverImageValidationSchema.safeParse(value);
    if (!parsedChannelCoverImage.success) {
      const errorMessage = parsedChannelCoverImage.error.message;
      throw new InvalidCoverImageException({
        message: `Channel's cover image validation failed. Reason: ${errorMessage}`,
      });
    }
    return new ChannelCoverImage(parsedChannelCoverImage.data);
  }

  public getValue() {
    return this.value;
  }
}
