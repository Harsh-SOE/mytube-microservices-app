import { ExceptionFilter, Catch, HttpException } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { Status } from '@grpc/grpc-js/build/src/constants';
import { isAppGrpcServiceError } from '@app/errors';
import { throwError } from 'rxjs';

@Catch()
export class AuthExceptionFilter implements ExceptionFilter {
  catch(exception: any) {
    switch (true) {
      case exception instanceof RpcException: {
        return throwError(() => exception);
      }

      case exception instanceof HttpException: {
        return throwError(() => new RpcException(exception));
      }

      case isAppGrpcServiceError(exception): {
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
