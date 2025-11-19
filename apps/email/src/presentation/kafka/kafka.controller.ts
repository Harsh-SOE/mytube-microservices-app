import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { CreatedUserMessageDto } from '@app/contracts/email';
import { EVENTS } from '@app/clients';

import { KafkaService } from './kafka.service';

@Controller()
export class KafkaController {
  constructor(private readonly emailService: KafkaService) {}

  @EventPattern(EVENTS.USER_CREATED_EVENT)
  sendEMail(@Payload() message: CreatedUserMessageDto) {
    return this.emailService.sendEMail(message);
  }
}
