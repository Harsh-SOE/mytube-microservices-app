import { TerminusModule } from '@nestjs/terminus';
import { Module } from '@nestjs/common';

import { AppConfigModule } from '@likes-aggregator/config';

import { AppHealthController } from './health.controller';
import { AppHealthService } from './health.service';

@Module({
  imports: [TerminusModule, AppConfigModule],
  controllers: [AppHealthController],
  providers: [AppHealthService],
})
export class AppHealthModule {}
