import { Module } from '@nestjs/common';
import { AppHealthController } from './health.controller';
import { AppHealthService } from './health.service';
import { TerminusModule } from '@nestjs/terminus';

@Module({
  imports: [TerminusModule],
  controllers: [AppHealthController],
  providers: [AppHealthService],
})
export class AppHealthModule {}
