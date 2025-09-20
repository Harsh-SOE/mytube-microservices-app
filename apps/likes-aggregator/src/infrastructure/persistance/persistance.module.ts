import { Global, Module } from '@nestjs/common';
import { PersistanceService } from './persistance.service';
import { AppConfigService } from '@likes-aggregator/config';
import { LogsModule } from '../logs';

@Global()
@Module({
  imports: [LogsModule],
  providers: [PersistanceService, AppConfigService],
  exports: [PersistanceService],
})
export class PersistanceModule {}
