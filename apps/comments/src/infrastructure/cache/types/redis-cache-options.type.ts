interface BaseRedisOptions {
  logErrors?: boolean;
}

interface RedisReadOperationOptions extends BaseRedisOptions {
  operationType: 'READ' | 'DELETE';
  key: string;
  value?: never;
}

interface RedisWriteOperationOptions extends BaseRedisOptions {
  operationType: 'WRITE';
  key: string;
  value: string;
}

interface SuppressErrorsOptions<TFallbackResult> {
  suppressErrors: true;
  fallbackValue: TFallbackResult;
}

interface ThrowErrorsOptions {
  suppressErrors?: false;
  fallbackValue?: never;
}

type ErrorHandlingOptions<TFallbackResult> =
  | SuppressErrorsOptions<TFallbackResult>
  | ThrowErrorsOptions;

export type RedisOptions<TFallbackResult = never> = (
  | RedisReadOperationOptions
  | RedisWriteOperationOptions
) &
  ErrorHandlingOptions<TFallbackResult>;
