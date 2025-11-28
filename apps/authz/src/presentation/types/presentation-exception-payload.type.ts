export interface ErrorPayload {
  timestamp: string;
  statusCode: string;
  serviceExceptionCode: number;
  httpExceptionCode: number;
  message: string;
  traceId?: string;
  severity?: string;
}
