import { string } from 'zod';

import { InvalidDomainInputException } from '@app/errors';

export class CommentText {
  private static CommentTextValidationSchema = string();

  public constructor(private value: string) {}

  /**
   * Creates a new CommentText instance from a given string value.
   * @throws {InvalidDomainInputException} if the given string value fails validation.
   * @param {string} value - the string value to be validated and used to create a new CommentText instance.
   * @returns {CommentText} a new CommentText instance.
   */
  public static create(value: string) {
    const parsedCommentValue =
      CommentText.CommentTextValidationSchema.safeParse(value);

    if (!parsedCommentValue.success) {
      const message = parsedCommentValue.error.message;
      throw new InvalidDomainInputException(
        `Comment text has failed validation. Reason: ${message}`,
      );
    }
    return new CommentText(parsedCommentValue.data);
  }

  /**
   * Retrieves the string value of the CommentText instance.
   * @returns {string} the value of the CommentText instance.
   */
  public getValue(): string {
    return this.value;
  }
}
