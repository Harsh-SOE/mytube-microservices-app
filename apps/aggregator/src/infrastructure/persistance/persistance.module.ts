import { Global, Module } from '@nestjs/common';
import { PersistanceService } from './persistance.service';

@Global()
@Module({
  providers: [PersistanceService],
  exports: [PersistanceService],
})
export class PersistanceModule {}
