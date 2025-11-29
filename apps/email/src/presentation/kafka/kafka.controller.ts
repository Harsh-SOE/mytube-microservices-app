import { Controller, Inject } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { CreatedUserMessageDto } from '@app/contracts/email';
import { USERS } from '@app/clients';

import { KafkaService } from './kafka.service';
import { LOGGER_PORT, LoggerPort } from '@email/application/ports';

@Controller()
export class KafkaController {
  constructor(
    private readonly emailService: KafkaService,
    @Inject(LOGGER_PORT) private readonly logger: LoggerPort,
  ) {}

  @EventPattern(USERS.USER_CREATED_EVENT)
  sendEMail(@Payload() message: CreatedUserMessageDto) {
    this.logger.info(`Sending email to ${message.email}`);
    return this.emailService.sendEMail(message);
  }
}
