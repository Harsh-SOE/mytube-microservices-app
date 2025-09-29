import { Catch, ExceptionFilter, HttpException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { throwError } from 'rxjs';

import { isGrpcApplicationError } from '@app/errors';

/* Do not throw any error here, it will crash the service... */
@Catch()
export class SagaExceptionFilter implements ExceptionFilter {
  catch(exception: any) {
    switch (true) {
      case exception instanceof RpcException: {
        return throwError(() => exception);
      }

      case exception instanceof HttpException: {
        return throwError(() => new RpcException(exception));
      }

      case isGrpcApplicationError(exception): {
        return throwError(() => exception);
      }

      default: {
        return throwError(
          () =>
            new RpcException({
              code: Status.UNKNOWN,
              message: `Internal server error`,
            }),
        );
      }
    }
  }
}
