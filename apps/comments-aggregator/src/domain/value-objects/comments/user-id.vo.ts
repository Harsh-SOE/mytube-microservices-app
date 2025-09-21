import { InvalidDomainInputException } from '@app/errors';
import { uuid } from 'zod';

export class UserId {
  private static UserIdValidationSchema = uuid();

  public constructor(private value: string) {}

  public static create(value: string) {
    const userIdParsedValue = UserId.UserIdValidationSchema.safeParse(value);
    if (!userIdParsedValue.success) {
      const message = userIdParsedValue.error.message;
      throw new InvalidDomainInputException(
        `Comment text has failed validation. Reason: ${message}`,
      );
    }
    return new UserId(userIdParsedValue.data);
  }

  public getValue(): string {
    return this.value;
  }
}
