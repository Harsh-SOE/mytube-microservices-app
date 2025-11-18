import { Module } from '@nestjs/common';

import { AppConfigModule } from './infrastructure/config';
import { GrpcModule } from './presentation/gprc/gprc.module';

@Module({
  imports: [AppConfigModule, GrpcModule],
  controllers: [],
  providers: [],
})
export class AuthzModule {}
