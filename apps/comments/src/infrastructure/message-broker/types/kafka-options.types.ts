interface BaseKafkaOptions {
  logErrors?: boolean;
}

interface KafkaPublishOrSendOperationOptions extends BaseKafkaOptions {
  operationType: 'PUBLISH_SEND';
  topic: string;
  message?: string;
}

interface KafkaSubscribeOperationOptions extends BaseKafkaOptions {
  operationType: 'SUBSCRIBE';
  topic: string;
  message?: never;
}

interface SuppressErrorsOptions<TFallbackResult> {
  suppressErrors: true;
  fallbackValue?: TFallbackResult;
}

interface ThrowErrorsOptions {
  suppressErrors?: false;
  fallbackValue?: never;
}

type ErrorHandlingOptions<TFallbackResult> =
  | SuppressErrorsOptions<TFallbackResult>
  | ThrowErrorsOptions;

export type KafkaOptions<TFallbackResult = never> = (
  | KafkaPublishOrSendOperationOptions
  | KafkaSubscribeOperationOptions
) &
  ErrorHandlingOptions<TFallbackResult>;
