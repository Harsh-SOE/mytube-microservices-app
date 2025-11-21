import { Module } from '@nestjs/common';

import { AppConfigModule } from './infrastructure/config';
import { GrpcModule } from './presentation/gprc/gprc.module';
import { AppHealthModule } from './infrastructure/health';

@Module({
  imports: [AppConfigModule, GrpcModule, AppHealthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
