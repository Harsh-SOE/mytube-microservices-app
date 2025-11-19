import { Inject, Injectable } from '@nestjs/common';

import { CreatedUserMessageDto } from '@app/contracts/email';
import { EMAIL, EmailPort } from '../../application/ports';

@Injectable()
export class KafkaService {
  constructor(@Inject(EMAIL) private email: EmailPort) {}

  async sendEMail(createdUserMessageDto: CreatedUserMessageDto) {
    await this.email.sendEmail({
      to: createdUserMessageDto.email,
      subject: `Welcome to streamforge`,
      content: `Hello`,
    });
  }
}
