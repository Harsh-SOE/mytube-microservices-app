import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';

import { HubAggregatePersistanceACL } from '@hub/infrastructure/anti-corruption';
import {
  HubCommandRepository,
  HubQueryRepository,
} from '@hub/infrastructure/repository';

import {
  PersistanceModule,
  PersistanceService,
} from '@hub/infrastructure/persistance';
import { AppConfigService } from '@hub/infrastructure/config';
import { HubCommandHandlers } from '@hub/application/commands';
import { HubEventHandler } from '@hub/application/events';
import { HubQueryHandler } from '@hub/application/query';
import {
  HUB_COMMAND_REPOSITORY,
  HUB_QUERY_REPOSITORY,
} from '@hub/application/ports';

import { HubController } from './hub.controller';
import { HubService } from './hub.service';

@Module({
  imports: [PersistanceModule, CqrsModule],
  providers: [
    HubService,
    PersistanceService,
    AppConfigService,
    HubAggregatePersistanceACL,
    {
      provide: HUB_COMMAND_REPOSITORY,
      useClass: HubCommandRepository,
    },
    {
      provide: HUB_QUERY_REPOSITORY,
      useClass: HubQueryRepository,
    },
    ...HubCommandHandlers,
    ...HubEventHandler,
    ...HubQueryHandler,
  ],
  controllers: [HubController],
})
export class HubModule {}
