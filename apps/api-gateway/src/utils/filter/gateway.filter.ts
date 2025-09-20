import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpStatus,
  HttpException,
} from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Response } from 'express';

import { BaseServiceException, getErrorPayload } from '@app/errors';

import { isAppGrpcServiceError } from '@app/errors';

@Catch()
export class GatewayExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const httpContext = host.switchToHttp();
    const response = httpContext.getResponse<Response>();

    let statusCode = 'Error';
    let errorCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let errorMessage = `Something went wrong`;
    let stack: string | undefined;

    switch (true) {
      /* Catch all the Grpc Service Error [EXTERNAL SERVICE CALL ERRORS ONLY!!!] */
      case isAppGrpcServiceError(exception): {
        const errorPayload = getErrorPayload(exception);
        statusCode = errorPayload.statusCode;
        errorCode = errorPayload.errorCode;
        stack = errorPayload.stack;
        break;
      }
      /* Catch all HttpException that occurs in the gateway [GATEWAY SPECIFIC ERROR ONLY!!!] */
      case exception instanceof HttpException: {
        errorCode = exception.getStatus();
        errorMessage = exception.message;
        stack = exception.stack;
        statusCode = exception.name;
        break;
      }

      /* Catch all the errors that were thrown in the external service call [EXTERNAL SERVICE CALL ERRORS ONLY!!!] */
      case exception instanceof RpcException: {
        const exceptionPayload = exception.getError() as BaseServiceException;
        statusCode = exceptionPayload.statusCode;
        errorCode = exceptionPayload.errorCode;
        errorMessage = exceptionPayload.message;
        stack = exceptionPayload.stack;
        break;
      }
    }

    /* Handle the error response, if error is niether an RpcException or HttpException then throw an INTERNAL_SERVER_ERROR */
    return response.status(errorCode).json({
      status: `Error`,
      statusCode: statusCode,
      errorCode: errorCode,
      success: false,
      message: errorMessage,
      stackTrace: stack?.split('\n'),
    });
  }
}
