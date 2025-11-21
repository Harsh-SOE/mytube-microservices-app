import { z } from 'zod';
import { v4 as uuidv4 } from 'uuid';

import { InvalidUserIdException } from '@reaction/domain/exceptions';

export class UserId {
  private static UserIdValidationSchema = z.uuid();

  public constructor(private readonly value: string) {}

  public static create(value?: string): UserId {
    if (!value) {
      return new UserId(uuidv4());
    }

    const parsedUserId = this.UserIdValidationSchema.safeParse(value);
    if (!parsedUserId.success) {
      throw new InvalidUserIdException({
        message: `An error occured while validating the userId: ${value}`,
        meta: parsedUserId.error,
      });
    }
    return new UserId(parsedUserId.data);
  }

  public getValue(): string {
    return this.value;
  }
}
