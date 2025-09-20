import { Module } from '@nestjs/common';

import { ViewsConsumerController } from './views-consumer.controller';
import { ViewsConsumerService } from './views-consumer.service';
import { AppConfigModule, AppConfigService } from '@views-aggregator/config';
import { PersistanceModule } from '@views-aggregator/infrastructure/persistance';
import { CqrsModule } from '@nestjs/cqrs';
import { LogsModule } from '@views-aggregator/infrastructure/logs';
import { ViewAggregatorCacheModule } from '@views-aggregator/infrastructure/cache';
import { ViewAggregateFactory } from '@views-aggregator/domain/factories';
import { ViewPeristanceAggregateACL } from '@views-aggregator/infrastructure/anti-corruption';
import { ViewRepository } from '@views-aggregator/infrastructure/repository';

@Module({
  imports: [
    AppConfigModule,
    PersistanceModule,
    CqrsModule,
    LogsModule,
    ViewAggregatorCacheModule,
  ],
  controllers: [ViewsConsumerController],
  providers: [
    ViewsConsumerService,
    AppConfigService,
    ViewAggregateFactory,
    ViewPeristanceAggregateACL,
    ViewRepository,
    AppConfigService,
  ],
})
export class ViewsConsumerModule {}
