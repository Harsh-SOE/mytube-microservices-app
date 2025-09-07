import { z } from 'zod';
import { UserEntityInvalidInputException } from '@app/errors';

export class UserName {
  private static UserNameValidationSchema = z
    .string()
    .trim()
    .min(5, 'Username should have atleast 5 characters')
    .max(12, 'Username cannot have more than 12 characters')
    .regex(
      /^[a-zA-Z][a-zA-Z0-9_]*$/,
      'Username must start with a letter and can only contain letters, numbers, and underscores',
    );

  public constructor(private readonly value: string) {}

  public static create(value: string) {
    const parsedUserNameResult =
      UserName.UserNameValidationSchema.safeParse(value);
    if (!parsedUserNameResult.success) {
      const errorMessage = parsedUserNameResult.error.message;
      console.log(`Invalid Username`);
      throw new UserEntityInvalidInputException(
        `Username validation failed. Reasons: ${errorMessage}`,
      );
    }
    return new UserName(parsedUserNameResult.data);
  }

  public getValue() {
    return this.value;
  }
}
