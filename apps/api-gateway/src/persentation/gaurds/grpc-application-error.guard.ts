import { Metadata, ServiceError } from '@grpc/grpc-js';

export function isGrpcApplicationError(err: unknown): err is ServiceError {
  if (!err || typeof err !== 'object') return false;

  const e = err as Partial<ServiceError>;

  if (typeof e.code !== 'number' || typeof e.details !== 'string') return false;

  if (!(e.metadata instanceof Metadata)) return false;

  const errorPayloadvalue = e.metadata.get('error-payload');
  if (
    !errorPayloadvalue ||
    !Array.isArray(errorPayloadvalue) ||
    errorPayloadvalue.length === 0 ||
    !(typeof errorPayloadvalue[0] === 'string')
  ) {
    console.log(`Error payload was not found...`);
    return false;
  }

  return true;
}
