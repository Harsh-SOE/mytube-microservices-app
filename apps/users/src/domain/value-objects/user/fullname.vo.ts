import { z } from 'zod';
import { UserEntityInvalidInputException } from '@app/errors';

export class UserFullName {
  private static UserFullNameValidationSchema = z
    .string()
    .trim()
    .toLowerCase()
    .min(3, 'Fullname should have atleast 3 characters')
    .max(35, 'fullname cannot have more than 35 characters')
    .regex(/^[a-zA-Z\s]+$/, 'Full name must only contain letters and spaces');

  public constructor(private readonly value: string) {}

  public static create(value: string) {
    const parsedFullNameResult =
      UserFullName.UserFullNameValidationSchema.safeParse(value);
    if (!parsedFullNameResult.success) {
      const errorMessage = parsedFullNameResult.error.message;
      console.log(`Invalid Fullname`);
      throw new UserEntityInvalidInputException(
        `Fullname validation failed. Reason: ${errorMessage}`,
      );
    }
    return new UserFullName(parsedFullNameResult.data);
  }

  public getValue() {
    return this.value;
  }
}
