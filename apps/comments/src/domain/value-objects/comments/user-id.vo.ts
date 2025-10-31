import { uuid } from 'zod';

import { InvalidDomainInputException } from '@app/errors';

export class UserId {
  private static UserIdValidationSchema = uuid();

  public constructor(private value: string) {}

  /**
   * Creates a UserId instance from a given string value.
   * @param {string} value - The value to be parsed.
   * @throws {InvalidDomainInputException} - If the value cannot be parsed.
   * @returns {UserId} - A UserId instance.
   */
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

  /**
   * Retrieves the value of this UserId instance.
   * @returns {string} - The value of this UserId instance.
   */
  public getValue(): string {
    return this.value;
  }
}
