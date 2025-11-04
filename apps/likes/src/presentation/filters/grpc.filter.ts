import { Catch, ExceptionFilter } from '@nestjs/common';
import { status as GrpcStatus } from '@grpc/grpc-js';

import { DomainException } from '@likes/domain/exceptions';
import { InfrastructureException } from '@likes/infrastructure/exceptions';

import { ErrorPayload } from '../types';
import { GrpcApplicationError } from '../exceptions';

@Catch()
export class GrpcFilter implements ExceptionFilter {
  catch(exception: any) {
    let code = GrpcStatus.UNKNOWN;
    const message = 'Internal server error';
    let payload: ErrorPayload = {
      statusCode: 'UNKNOWN_ERROR',
      timestamp: new Date().toISOString(),
      severity: 'ERROR',
    };

    if (exception instanceof DomainException) {
      code = GrpcStatus.FAILED_PRECONDITION;
      payload = {
        severity: 'CLIENT_ERROR',
        statusCode: exception.code,
        timestamp: exception.timestamp.toISOString(),
      };
    }

    if (exception instanceof InfrastructureException) {
      code = GrpcStatus.INTERNAL;
      payload = {
        statusCode: exception.code,
        timestamp: exception.timestamp.toISOString(),
      };
    }
    throw new GrpcApplicationError(code, message, payload);
  }
}
