import { throwError } from 'rxjs';
import { Catch, ExceptionFilter, HttpStatus, Inject } from '@nestjs/common';
import { status as GrpcStatus } from '@grpc/grpc-js';

import { DomainException } from '@users/domain/exceptions';
import { InfrastructureException } from '@users/infrastructure/exceptions';
import { ApplicationException } from '@users/application/exceptions';
import { LOGGER_PORT, LoggerPort } from '@users/application/ports';

import { ErrorPayload } from '../types';
import { GrpcApplicationException } from '../exceptions';

@Catch()
export class GrpcFilter implements ExceptionFilter {
  constructor(@Inject(LOGGER_PORT) private readonly logger: LoggerPort) {}

  catch(exception: any) {
    let code = GrpcStatus.UNKNOWN;
    let message = 'Internal server error';
    let payload: ErrorPayload = {
      statusCode: 'UNKNOWN',
      serviceExceptionCode: GrpcStatus.UNKNOWN,
      httpExceptionCode: HttpStatus.INTERNAL_SERVER_ERROR,
      message: `something went wrong`,
      timestamp: new Date().toISOString(),
      severity: 'ERROR',
    };

    if (exception instanceof DomainException) {
      code = GrpcStatus.FAILED_PRECONDITION;
      payload = {
        severity: 'CLIENT_ERROR',
        statusCode: exception.code,
        timestamp: exception.timestamp.toISOString(),
        serviceExceptionCode: GrpcStatus.FAILED_PRECONDITION,
        httpExceptionCode: HttpStatus.NOT_ACCEPTABLE,
        message: exception.message ?? `Client provided incorrect information`,
      };
    }

    if (exception instanceof InfrastructureException) {
      code = GrpcStatus.INTERNAL;
      payload = {
        severity: 'INTERNAL_ERROR',
        statusCode: exception.code,
        timestamp: exception.timestamp.toISOString(),
        serviceExceptionCode: GrpcStatus.INTERNAL,
        httpExceptionCode: HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message ?? `something went wrong on server side`,
      };
    }

    if (exception instanceof ApplicationException) {
      code = GrpcStatus.FAILED_PRECONDITION;
      payload = {
        severity: 'APPLICATION_ERROR',
        statusCode: exception.code,
        timestamp: exception.timestamp.toISOString(),
        serviceExceptionCode: GrpcStatus.INTERNAL,
        httpExceptionCode:
          exception.httpStatus ?? HttpStatus.INTERNAL_SERVER_ERROR,
        message: exception.message ?? `something went wrong on server side`,
      };
      message = `Application error has occured`;
    }
    const error = new GrpcApplicationException(code, message, payload);
    this.logger.info(`The grpc error is`, error);

    return throwError(() => error.getError());
  }
}
