import { CLIENT_PROVIDER, EMAIL_CLIENT, WATCH_CLIENT } from '@app/clients';
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
    @Inject(CLIENT_PROVIDER.EMAIL) private readonly emailBroker: ClientKafka,
    @Inject(CLIENT_PROVIDER.WATCH) private readonly watchBroker: ClientKafka,
  ) {}

  async onModuleInit() {
    await this.emailBroker.connect();
    await this.watchBroker.connect();
  }

  async onModuleDestroy() {
    await this.emailBroker.close();
    await this.watchBroker.close();
  }

  OnUserCreatedSendEmail(payload: MessagePayloadType) {
    this.emailBroker.emit(EMAIL_CLIENT.USER_CREATED, payload);
  }

  OnUserCreatedSaveInWatch(payload: MessagePayloadType) {
    this.watchBroker.emit(WATCH_CLIENT.USER_CREATED, payload);
  }
}
