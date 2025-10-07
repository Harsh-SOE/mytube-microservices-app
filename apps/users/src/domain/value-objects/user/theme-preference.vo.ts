import { z } from 'zod';

import { UserEntityInvalidInputException } from '@app/errors';
import { DomainThemePreference } from '@users/domain/enums';

export class UserThemePreference {
  private static UserThemePreferenceValidationSchema = z
    .enum(DomainThemePreference)
    .optional()
    .default(DomainThemePreference.SYSTEM);

  public constructor(private readonly value: DomainThemePreference) {}

  public static create(value?: string) {
    const parsedDateResult =
      UserThemePreference.UserThemePreferenceValidationSchema.safeParse(value);
    if (!parsedDateResult.success) {
      const errorMessage = parsedDateResult.error.message;
      console.log(`Invalid Theme`);
      throw new UserEntityInvalidInputException(
        `Theme validation failed. Reason: ${errorMessage}`,
      );
    }
    return new UserThemePreference(parsedDateResult.data);
  }

  public getValue() {
    return this.value;
  }
}
