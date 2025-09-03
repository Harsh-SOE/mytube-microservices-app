import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';

import { CreatedUserMessageDto } from '@app/contracts/email';
import { EMAIL_CLIENT } from '@app/clients';

import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @EventPattern(EMAIL_CLIENT.USER_CREATED)
  sendEMail(@Payload() message: CreatedUserMessageDto) {
    return this.emailService.sendEMail(message);
  }
}
