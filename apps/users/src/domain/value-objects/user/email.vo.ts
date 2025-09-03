import { z } from 'zod';
import { UserEntityInvalidInputException } from '@app/errors';

export class UserEmail {
  private static UserEmailValidationSchema = z.email();

  public constructor(private readonly value: string) {}

  public static create(value: string) {
    if (!value || value.trim().length === 0) {
      throw new Error(`Email is required`);
    }
    const parsedEmailResult =
      UserEmail.UserEmailValidationSchema.safeParse(value);
    if (!parsedEmailResult.success) {
      const errorMessage = parsedEmailResult.error.message;
      console.log(`Invalid Email`);
      throw new UserEntityInvalidInputException(
        `Email validation failed. Reason: ${errorMessage}`,
      );
    }
    return new UserEmail(parsedEmailResult.data);
  }

  getValue(): string {
    return this.value;
  }
}
