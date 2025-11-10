import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { VideoTranscoderModule } from '@transcoder/presentation';
import { AppConfigModule } from '@transcoder/infrastructure/config';

import { LOGGER_PORT } from './application/ports';
import { AppHealthModule } from './infrastructure/health';
import { WinstonLoggerAdapter } from './infrastructure/logger';

@Module({
  imports: [
    AppConfigModule,
    VideoTranscoderModule,
    AppHealthModule,
    CqrsModule,
  ],
  providers: [{ provide: LOGGER_PORT, useClass: WinstonLoggerAdapter }],
})
export class AppModule {}
