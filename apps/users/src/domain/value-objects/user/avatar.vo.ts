import { z } from 'zod';
import { UserEntityInvalidInputException } from '@app/errors';

export class UserAvatarImage {
  private static UserAvatarImageValidationSchema = z.string();

  public constructor(private readonly value: string) {}

  public static create(value: string) {
    const parsedUrlResult =
      UserAvatarImage.UserAvatarImageValidationSchema.safeParse(value);
    if (!parsedUrlResult.success) {
      console.log(`Invalid Avatar`);
      const errorMessage = parsedUrlResult.error.message;
      throw new UserEntityInvalidInputException(
        `AvatarImage validation failed. Reason: ${errorMessage}`,
      );
    }
    return new UserAvatarImage(parsedUrlResult.data);
  }

  public getValue() {
    return this.value;
  }
}
