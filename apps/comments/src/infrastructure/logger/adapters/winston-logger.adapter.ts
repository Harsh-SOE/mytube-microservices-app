import { Injectable, OnModuleInit } from '@nestjs/common';
import LokiTransport from 'winston-loki';
import winston, {
  createLogger,
  format,
  Logger,
  transport,
  Logform,
  transports,
} from 'winston';

import { LoggerPort } from '@comments/application/ports';
import { AppConfigService } from '@comments/infrastructure/config';

const levels = {
  fatal: 0,
  error: 1,
  alert: 2,
  warn: 3,
  info: 4,
  debug: 5,
};

const colors = {
  fatal: 'bgRed white bold',
  error: 'red bold',
  alert: 'yellow bold',
  warn: 'yellow',
  info: 'cyan',
  debug: 'gray',
};

export interface MyConsoleLogCompleteInfo extends Logform.TransformableInfo {
  message: string;
  timestamp: string;
  stack?: string;
  [key: string]: any;
}

@Injectable()
export class WinstonLoggerAdapter implements LoggerPort, OnModuleInit {
  private logger: Logger;

  constructor(private readonly configService: AppConfigService) {
    winston.addColors(colors);
  }

  consoleTransport() {
    const consoleFormatPipeline = format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.colorize(),
      format.printf((info: MyConsoleLogCompleteInfo) => {
        const { level, message, timestamp, stack, ...meta } = info;
        return `[${timestamp}] [${level}] ${message} ${JSON.stringify(meta || {})} ${stack || ''}`;
      }),
    );
    return new transports.Console({
      level: 'debug',
      format: consoleFormatPipeline,
    });
  }

  lokiTransport() {
    const lokiFormatPipeline = format.combine(
      format.timestamp(),
      format.errors({ stack: true }),
      format.json({ maximumDepth: 3 }),
    );
    return new LokiTransport({
      host: this.configService.GRAFANA_LOKI_URL,
      level: 'debug',
      format: lokiFormatPipeline,
    });
  }

  onModuleInit() {
    const loggerTransports: transport[] = [
      this.consoleTransport(),
      this.lokiTransport(),
    ];

    this.logger = createLogger({
      levels: levels,
      level: 'debug',
      format: format.combine(
        format.timestamp(),
        format.json(),
        format.errors(),
      ),
      transports: loggerTransports,
    });
  }

  info(message: string, ...meta: Record<string, any>[]): void {
    this.logger.log('info', message, ...meta);
  }

  error(message: string, ...meta: Record<string, any>[]): void {
    this.logger.log('error', message, meta);
  }

  alert(message: string, ...meta: Record<string, any>[]): void {
    this.logger.log('alert', message, meta);
  }

  fatal(message: string, ...meta: Record<string, any>[]): void {
    this.logger.log('fatal', message, meta);
  }
}
