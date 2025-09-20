import { JwtUserPayload } from '@app/contracts/jwt';
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';

export const User = createParamDecorator(
  (data: keyof JwtUserPayload, context: ExecutionContext) => {
    const httpContext = context.switchToHttp();
    const request = httpContext.getRequest<Request>();
    const extractedUser = request.user as JwtUserPayload;
    return data ? extractedUser[data] : extractedUser;
  },
);
