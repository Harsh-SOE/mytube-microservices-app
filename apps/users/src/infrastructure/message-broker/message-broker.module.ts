import { Global, Module } from '@nestjs/common';
import { MessageBrokerService } from './message-broker.service';
import { ClientsModule } from '@nestjs/microservices';
import { CLIENT_PROVIDER } from '@app/clients';
import { AppConfigModule, AppConfigService } from '@users/config';

@Global()
@Module({
  providers: [MessageBrokerService, AppConfigService],
  imports: [
    AppConfigModule,
    ClientsModule.registerAsync([
      {
        name: CLIENT_PROVIDER.EMAIL,
        imports: [AppConfigModule],
        inject: [AppConfigService],
        useFactory: (configService: AppConfigService) =>
          configService.EMAIL_SERVICE_OPTIONS,
      },
      {
        name: CLIENT_PROVIDER.WATCH,
        imports: [AppConfigModule],
        inject: [AppConfigService],
        useFactory: (configService: AppConfigService) =>
          configService.WATCH_SERVICE_OPTIONS,
      },
    ]),
  ],
  exports: [MessageBrokerService],
})
export class MessageBrokerModule {}
