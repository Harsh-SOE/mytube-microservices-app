import { CLIENT_PROVIDER } from '@app/clients';
import {
  Inject,
  Injectable,
  OnModuleDestroy,
  OnModuleInit,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';

@Injectable()
export class MessageBrokerService<MessagePayloadType>
  implements OnModuleInit, OnModuleDestroy
{
  constructor(
    @Inject(CLIENT_PROVIDER.EMAIL) private readonly messageBroker: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.messageBroker.connect();
  }

  async onModuleDestroy() {
    await this.messageBroker.close();
  }

  sendEmail(eventPattern: string, payload: MessagePayloadType) {
    this.messageBroker.emit(eventPattern, payload);
  }
}
