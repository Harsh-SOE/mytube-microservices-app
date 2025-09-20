import { Module } from '@nestjs/common';
import { WatchController } from './watch.controller';
import { WatchService } from './watch.service';
import { ClientsModule } from '@nestjs/microservices';
import { CLIENT_PROVIDER } from '@app/clients';
import { AppConfigModule } from '../config/config.module';
import { AppConfigService } from '../config/config.service';

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
