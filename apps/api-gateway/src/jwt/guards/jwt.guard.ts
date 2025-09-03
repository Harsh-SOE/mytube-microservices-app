/* eslint-disable @typescript-eslint/no-unused-vars */
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { GATEWAY_GAURD_STRATEGY } from '../constants';
import { JwtUserPayload } from '@app/contracts/jwt';
import { UnauthorizedException } from '../../errors/unauthorized.exception';

@Injectable()
export class GatewayJwtGuard extends AuthGuard(GATEWAY_GAURD_STRATEGY) {
  /*
  handleRequest<TUser = JwtUserPayload>(
    err: Error | null,
    user: JwtUserPayload | null | false,
    info?: { message?: string; name?: string },
    context?: ExecutionContext,
    status?: any,
  ): TUser {
    const message = info?.message?.toLowerCase() ?? '';

    // No token provided
    if (
      message.includes('no auth token') ||
      message.includes('missing auth token')
    ) {
      throw new UnauthorizedException('No token was provided.');
    }

    // Invalid token
    if (message.includes('invalid token')) {
      throw new UnauthorizedException('Invalid token was given.');
    }

    // Expired token
    if (message.includes('jwt expired')) {
      throw new UnauthorizedException('Token has expired.');
    }

    // Other cases: invalid user or error
    if (err || !user) {
      throw err || new UnauthorizedException('Invalid or expired token.');
    }

    return user as unknown as TUser;
  }
  */
}
