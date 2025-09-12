import { CLIENT_PROVIDER } from '@app/clients';
import { Module } from '@nestjs/common';
import { ClientsModule } from '@nestjs/microservices';

@Module({
  imports: [
    ClientsModule.registerAsync([
      {
        name: CLIENT_PROVIDER.USER,
      },
    ]),
  ],
})
export class MessageBroker {}
