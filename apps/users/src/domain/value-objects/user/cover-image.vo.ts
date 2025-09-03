import { UserEntityInvalidInputException } from '@app/errors';
import { z } from 'zod';

export class UserCoverImage {
  private static UserCoverImageValidationSchema = z.string().optional();

  public constructor(private readonly value: string | undefined) {}

  public static create(value: string | undefined) {
    const parsedUrlResult =
      UserCoverImage.UserCoverImageValidationSchema.safeParse(value);
    if (!parsedUrlResult.success) {
      const errorMessage = parsedUrlResult.error.message;
      console.log(`Invalid Cover`);
      throw new UserEntityInvalidInputException(
        `CoverImage validation failed. Reason: ${errorMessage}`,
      );
    }
    return new UserCoverImage(parsedUrlResult.data);
  }

  public getValue() {
    return this.value;
  }
}
