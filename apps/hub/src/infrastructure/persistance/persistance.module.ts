import { Module } from '@nestjs/common';

import { PersistanceService } from './persistance.service';

@Module({
  providers: [PersistanceService],
  exports: [PersistanceService],
})
export class PersistanceModule {}
