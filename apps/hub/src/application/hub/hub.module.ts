import { Module } from '@nestjs/common';

import { HubAggregatePersistanceACL } from '@hub/infrastructure/anti-corruption';
import { HubAggregateFactory } from '@hub/domain/factories';
import {
  HubCommandRepository,
  HubQueryRepository,
} from '@hub/infrastructure/repository';

import {
  PersistanceModule,
  PersistanceService,
} from '@hub/infrastructure/persistance';
import { AppConfigService } from '@hub/infrastructure/config';

import { HubController } from './hub.controller';
import { HubService } from './hub.service';

import { HubCommandHandlers } from '../commands';
import { HubEventHandler } from '../events';
import { HubQueryHandler } from '../query';

@Module({
  imports: [PersistanceModule],
  providers: [
    HubService,
    PersistanceService,
    AppConfigService,
    HubCommandRepository,
    HubQueryRepository,
    HubAggregateFactory,
    HubAggregatePersistanceACL,
    ...HubCommandHandlers,
    ...HubEventHandler,
    ...HubQueryHandler,
  ],
  controllers: [HubController],
})
export class HubModule {}
