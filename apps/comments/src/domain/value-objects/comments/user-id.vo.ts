import { uuid } from 'zod';

import { InvalidUserIdException } from '@comments/domain/exceptions';

export class UserId {
  private static UserIdValidationSchema = uuid();

  public constructor(private value: string) {}

  public static create(value: string) {
    const userIdParsedValue = UserId.UserIdValidationSchema.safeParse(value);
    if (!userIdParsedValue.success) {
      const message = userIdParsedValue.error.message;
      throw new InvalidUserIdException({
        message: `Comment text has failed validation. Reason: ${message}`,
      });
    }
    return new UserId(userIdParsedValue.data);
  }

  public getValue(): string {
    return this.value;
  }
}
