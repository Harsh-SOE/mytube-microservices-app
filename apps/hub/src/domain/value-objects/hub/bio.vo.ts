import { Injectable } from '@nestjs/common';
import { z } from 'zod';

import { UserEntityInvalidInputException } from '@app/errors';

@Injectable()
export class HubBio {
  private static hubValidationSchema = z.string().optional();

  public constructor(private value?: string) {}

  public static create(value?: string) {
    const parsedHubBio = HubBio.hubValidationSchema.safeParse(value);

    if (!parsedHubBio.success) {
      const errorMessage = parsedHubBio.error.message;
      throw new UserEntityInvalidInputException(
        `Hub's Bio validation failed. Reason: ${errorMessage}`,
      );
    }
    return new HubBio(parsedHubBio.data);
  }

  public getValue() {
    return this.value;
  }
}
