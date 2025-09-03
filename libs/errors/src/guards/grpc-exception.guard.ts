import { Metadata } from '@grpc/grpc-js';
import { AppGrpcServiceError } from '../common/grpc-exception';

export function isAppGrpcServiceError(
  err: unknown,
): err is AppGrpcServiceError {
  // if the exception is not an object then it is not an Grpc Exception as an error object is thrown for Grpc exception
  if (!err || typeof err !== 'object') return false;

  // assuming err as Partial ServiceError for ensure type safety while applying type checking
  const e = err as Partial<AppGrpcServiceError>;

  // if the err is ServiceError from Grpc then, It has:
  // 1. code of type number.
  // 2. message of type string
  if (typeof e.code !== 'number' || typeof e.message !== 'string') return false;

  // 3. metadata of type MetaData
  if (!(e.metadata instanceof Metadata)) return false;

  /* CHECK:
  1. if the e.metadata has 'error-payload' in it.
  2. if the e.metadata.get('error-payload') is of type array
  3. if length of the array for e.metadata.get('error-payload') > 0
  */

  // if any of them fails the error is not AppGrpcException
  const errorPayloadvalue = e.metadata.get('error-payload');
  if (
    !errorPayloadvalue ||
    !Array.isArray(errorPayloadvalue) ||
    errorPayloadvalue.length === 0 ||
    !(typeof errorPayloadvalue[0] === 'string')
  ) {
    return false;
  }

  /*
  {
    code: Status,
    message: 'Error message',
    metadata: map( 'error-payload': ['{ statusCode: statusCodeValue(string), errorCode: errorCodeValue(number), stack: ErrorStack(string) }'] )
  }
  */

  // e.metadata.get('error-payload')
  // => Get the value key 'error-payload' in the metadata map
  // => ['{ statusCode: statusCodeValue(string), errorCode: errorCodeValue(number), stack: ErrorStack(string) }']

  // e.metadata.get('error-payload)[0]
  // => get the first value of the array
  // => '{ statusCode: statusCodeValue(string), errorCode: errorCodeValue(number), stack: ErrorStack(string) }'
  const values = e.metadata.get('error-payload')[0].toString();

  /*
    JSON.parse(e.metadata.get('error-payload)[0]), will return an object from the retreived string value as:
    {
      statusCode: statusCodeValue,
      errorCode: errorCodeValue,
      stack: ErrorStack
    } 
  */
  const parsed: unknown = JSON.parse(values);
  // now the extract payload after parsing must have 'statusCode', 'errorCode' & 'stack' in it
  return (
    typeof parsed === 'object' &&
    parsed !== null &&
    'statusCode' in parsed &&
    'errorCode' in parsed &&
    'stack' in parsed
  );
}
