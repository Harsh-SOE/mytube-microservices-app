import { Global, Module } from '@nestjs/common';
import { PersistanceService } from './peristance.service';

@Global()
@Module({
  providers: [PersistanceService],
  imports: [],
  exports: [PersistanceService],
})
export class PersistanceModule {}
