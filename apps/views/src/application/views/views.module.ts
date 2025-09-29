import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { CLIENT_PROVIDER } from '@app/clients';

import {
  AppConfigModule,
  AppConfigService,
} from '@views/infrastructure/config';
import { ViewsCacheModule } from '@views/infrastructure/cache';

import { ViewsController } from './views.controller';
import { WatchService } from './views.service';

@Module({
  imports: [
    AppConfigModule,
    ViewsCacheModule,
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
  controllers: [ViewsController],
  providers: [WatchService],
})
export class WatchModule {}
