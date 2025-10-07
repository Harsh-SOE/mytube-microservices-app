import { Global, Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import {
  AppConfigModule,
  AppConfigService,
} from '@users/infrastructure/config';

import { CLIENT_PROVIDER } from '@app/clients';

import { MessageBrokerService } from './message-broker.service';

/**
 * The `MessageBrokerModule` serves as the infrastructure module for integrating message broker functionality
 * within the Users application. This module can be extended to provide providers and configuration
 * for message-based communication between microservices or external systems.
 *
 * @module MessageBrokerModule
 */
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
