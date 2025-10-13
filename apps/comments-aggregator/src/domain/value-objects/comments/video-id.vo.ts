import { uuid } from 'zod';

import { InvalidDomainInputException } from '@app/errors';

export class VideoId {
  private static VideoIdValidationSchema = uuid();

  public constructor(private value: string) {}

  /**
   * Creates a new VideoId instance from a given string value.
   * @throws {InvalidDomainInputException} if the given string value fails validation.
   * @param {string} value - the string value to be validated and used to create a new VideoId instance.
   * @returns {VideoId} a new VideoId instance.
   */
  public static create(value: string) {
    const userIdParsedValue = VideoId.VideoIdValidationSchema.safeParse(value);
    if (!userIdParsedValue.success) {
      const message = userIdParsedValue.error.message;
      throw new InvalidDomainInputException(
        `Comment text has failed validation. Reason: ${message}`,
      );
    }
    return new VideoId(userIdParsedValue.data);
  }

  /**
   * Retrieves the value of this VideoId instance.
   * @returns {string} The value of this VideoId instance.
   */
  public getValue(): string {
    return this.value;
  }
}
