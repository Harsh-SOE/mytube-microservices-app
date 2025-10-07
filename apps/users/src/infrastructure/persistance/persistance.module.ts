import { Global, Module } from '@nestjs/common';

import { AppConfigModule } from '@users/infrastructure/config';

import { PersistanceService } from './persistance.service';

/**
 * The `PersistanceModule` class serves as the root module for persistence-related infrastructure
 * within the Users application. It is intended to encapsulate and provide configuration for
 * database connections, repositories, and other persistence mechanisms.
 *
 * @module PersistanceModule
 */
@Global()
@Module({
  imports: [AppConfigModule],
  providers: [PersistanceService],
  exports: [PersistanceService],
})
export class PersistanceModule {}
