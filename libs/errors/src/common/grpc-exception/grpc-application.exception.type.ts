import { Metadata, ServiceError } from '@grpc/grpc-js';

/**
 * Defines a structured payload for application-specific errors.
 * This is often serialized to JSON and included in API responses or gRPC metadata.
 */
export interface ErrorPayload {
  /**
   * The standard HTTP status code that best maps to this error.
   * This allows HTTP gateways and clients to handle the error appropriately.
   * @example 404
   * @see {@link https://developer.mozilla.org/en-US/docs/Web/HTTP/Status}
   */
  errorCode: number;

  /**
   * A specific, application-defined error string for programmatic use on the client.
   * This is more stable than relying on parsing a human-readable message.
   * @example "USER_NOT_FOUND"
   */
  statusCode: string;

  /**
   * The optional stack trace of the error.
   * This should typically be included only in development environments for debugging.
   */
  stack?: string;

  /**
   * A container for any additional, arbitrary context related to the error.
   * Using `unknown` is a type-safe alternative to `any`, forcing the consumer
   * to perform explicit type checking before using the data.
   * @example { "details": "User has not been active for over 6 months." }
   */
  internals?: unknown;
}

/**
 * Represents a gRPC service error guaranteed to contain a structured
 * application error payload within its metadata.
 *
 * This type ensures the `metadata` object has a `get` method that
 * specifically returns a `string[]` for the "error-payload" key.
 *
 * @example
 * try {
 * await client.someRpcCall({});
 * } catch (e) {
 * const err = e as GrpcApplicationErrorType;
 * if (err.code === grpc.status.INVALID_ARGUMENT) {
 * // TypeScript knows this returns string[] because of the custom type.
 * const payload = err.metadata.get('error-payload');
 * console.error('Validation errors:', payload);
 * }
 * }
 */
export interface GrpcApplicationErrorType extends ServiceError {
  metadata: Metadata & {
    get(key: 'error-payload'): Array<string>;
  };
}

/**
 * Returns the error payload from the error metadata.
 * @param {GrpcApplicationErrorType} err - The error object
 * @returns {ErrorPayload} - The error payload
 */
export function getErrorPayload(err: GrpcApplicationErrorType): ErrorPayload {
  const raw = err.metadata.get('error-payload')?.[0];
  return JSON.parse(raw) as ErrorPayload;
}
