import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

import { CLIENT_PROVIDER } from '@app/clients';

import { MessageBrokerService } from './message-broker.service';
import { AppConfigModule, AppConfigService } from '../config';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: CLIENT_PROVIDER.EMAIL,
        imports: [AppConfigModule],
        inject: [AppConfigService],
        useFactory: (configService: AppConfigService) =>
          configService.KAFKA_OPTIONS,
      },
    ]),
  ],
  providers: [MessageBrokerService],
})
export class MessageBrokerModule {}
