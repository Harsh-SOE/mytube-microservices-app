import { UserAuthPayload } from '@app/contracts/auth';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const User = createParamDecorator(
  (data: keyof UserAuthPayload, context: ExecutionContext) => {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const extractedUser = request.user as UserAuthPayload;
    return data ? extractedUser[data] : extractedUser;
  },
);
