import { Metadata, ServiceError } from '@grpc/grpc-js';

export interface ErrorPayload {
  statusCode: string;
  errorCode: number;
  stack?: string;
  internals?: any;
}

export interface AppGrpcServiceError extends ServiceError {
  metadata: Metadata & {
    get(key: 'error-payload'): Array<string>;
  };
}

export function getErrorPayload(err: AppGrpcServiceError): ErrorPayload {
  const raw = err.metadata.get('error-payload')?.[0];
  return JSON.parse(raw) as ErrorPayload;
}
