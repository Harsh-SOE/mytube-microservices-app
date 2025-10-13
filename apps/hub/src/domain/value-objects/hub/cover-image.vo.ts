import z from 'zod';
import { Injectable } from '@nestjs/common';

import { EntityInvalidInputException } from '@app/errors';

@Injectable()
export class HubCoverImage {
  private static hubCoverImageValidationSchema = z.url().optional();

  public constructor(private value?: string) {}

  public static create(value?: string) {
    const parsedHubCoverImage =
      HubCoverImage.hubCoverImageValidationSchema.safeParse(value);
    if (!parsedHubCoverImage.success) {
      const errorMessage = parsedHubCoverImage.error.message;
      throw new EntityInvalidInputException(
        `Hub's cover image validation failed. Reason: ${errorMessage}`,
      );
    }
    return new HubCoverImage(parsedHubCoverImage.data);
  }

  public getValue() {
    return this.value;
  }
}
