import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { CLIENT_PROVIDER } from '@app/clients';

import {
  AppConfigModule,
  AppConfigService,
} from '@watch/infrastructure/config';
import { WatchCacheModule } from '@watch/infrastructure/cache';

import { WatchController } from './watch.controller';
import { WatchService } from './watch.service';

@Module({
  imports: [
    AppConfigModule,
    WatchCacheModule,
    ClientsModule.registerAsync([
      {
        name: CLIENT_PROVIDER.VIEWS_AGGREGATOR,
        imports: [AppConfigModule],
        inject: [AppConfigService],
        useFactory: (configService: AppConfigService) =>
          configService.VIEW_AGGREGATOR_SERVICE_OPTIONS,
      },
    ]),
  ],
  controllers: [WatchController],
  providers: [WatchService],
})
export class WatchModule {}
