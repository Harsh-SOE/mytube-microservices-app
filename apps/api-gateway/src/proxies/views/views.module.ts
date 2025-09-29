import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { CLIENT_PROVIDER } from '@app/clients';

import {
  AppConfigModule,
  AppConfigService,
} from '@gateway/infrastructure/config';

import { WatchService } from './views.service';
import { WatchController } from './views.controller';

@Module({
  imports: [
    AppConfigModule,
    ClientsModule.registerAsync([
      {
        name: CLIENT_PROVIDER.WATCH,
        imports: [AppConfigModule],
        inject: [AppConfigService],
        useFactory: (configService: AppConfigService) =>
          configService.WATCH_SERVICE_OPTION,
      },
    ]),
  ],
  controllers: [WatchController],
  providers: [WatchService],
})
export class WatchModule {}
