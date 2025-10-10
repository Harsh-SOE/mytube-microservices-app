import { Module } from '@nestjs/common';
import { EmailService } from './email/email.service';
import { EmailController } from './email/email.controller';
import { EmailModule } from './email/email.module';
import { AppConfigModule } from './config/config.module';
import { MeasureModule } from './measure/measure.module';
import { LogsModule } from './logs/logs.module';
import { AppHealthModule } from './health';

@Module({
  imports: [
    EmailModule,
    AppConfigModule,
    MeasureModule,
    LogsModule,
    AppHealthModule,
  ],
  providers: [EmailService],
  controllers: [EmailController],
})
export class AppModule {}
