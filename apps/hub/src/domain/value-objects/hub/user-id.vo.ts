import { Injectable } from '@nestjs/common';
import z from 'zod';

import { UserEntityInvalidInputException } from '@app/errors';

@Injectable()
export class HubUserId {
  private static hubUserIdValidationSchema = z.uuid();

  public constructor(private value: string) {}

  public static create(value: string) {
    const parsedHubUserId =
      HubUserId.hubUserIdValidationSchema.safeParse(value);
    if (!parsedHubUserId.success) {
      const errorMessage = parsedHubUserId.error.message;
      throw new UserEntityInvalidInputException(
        `Hub's UserId validation failed. Reason: ${errorMessage}`,
      );
    }
    return new HubUserId(parsedHubUserId.data);
  }

  public getValue() {
    return this.value;
  }
}
