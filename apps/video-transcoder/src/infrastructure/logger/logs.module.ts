import { Global, Module } from '@nestjs/common';
import winston, { createLogger } from 'winston';
import LokiTransport from 'winston-loki';

import {
  AppConfigModule,
  AppConfigService,
} from '@transcoder/infrastructure/config';

import { WINSTON_LOGGER } from '@app/clients/constant';

@Global()
@Module({
  imports: [AppConfigModule],
  providers: [
    {
      inject: [AppConfigService],
      provide: WINSTON_LOGGER,
      useFactory: (configService: AppConfigService) => {
        const customLevels = {
          levels: {
            alert: 0,
            error: 1,
            warn: 2,
            info: 3,
            debug: 4,
          },
        };
        const options: winston.LoggerOptions = {
          levels: customLevels.levels,
          level: 'debug',
          transports: [
            new LokiTransport({
              host: configService.GRAFANA_LOKI_URL,
            }),
          ],
        };
        const logger: winston.Logger = createLogger(options);
        return logger;
      },
    },
  ],
  exports: [WINSTON_LOGGER],
})
export class LogsModule {}
