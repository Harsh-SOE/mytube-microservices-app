import { Module } from '@nestjs/common';

import {
  AppConfigModule,
  AppConfigService,
} from '@email/infrastructure/config';
import { EMAIL, LOGGER_PORT } from '@email/application/ports';
import { WinstonLoggerAdapter } from '@email/infrastructure/logger';
import { MailerSendEmailAdapter } from '@email/infrastructure/email';
import { MeasureModule } from '@email/infrastructure/measure';

@Module({
  imports: [AppConfigModule, MeasureModule],
  providers: [
    { provide: LOGGER_PORT, useClass: WinstonLoggerAdapter },
    { provide: EMAIL, useClass: MailerSendEmailAdapter },
    AppConfigService,
  ],
  exports: [LOGGER_PORT, EMAIL, AppConfigService],
})
export class KakfaModule {}
