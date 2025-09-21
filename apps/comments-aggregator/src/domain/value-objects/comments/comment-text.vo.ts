import { InvalidDomainInputException } from '@app/errors';
import { string } from 'zod';

export class CommentText {
  private static CommentTextValidationSchema = string();

  public constructor(private value: string) {}

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

  public getValue(): string {
    return this.value;
  }
}
