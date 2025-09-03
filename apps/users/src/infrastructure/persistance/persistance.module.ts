import { Global, Module } from '@nestjs/common';

import { AppConfigModule } from '@users/config';

import { PersistanceService } from './persistance.service';

@Global()
@Module({
  imports: [AppConfigModule],
  providers: [PersistanceService],
  exports: [PersistanceService],
})
export class PersistanceModule {}
