import { Inject, Injectable } from '@nestjs/common';
import winston from 'winston';

import { CreatedUserMessageDto } from '@app/contracts/email';
import { WINSTON_LOGGER } from '@app/clients';

@Injectable()
export class EmailService {
  constructor(@Inject(WINSTON_LOGGER) private logger: winston.Logger) {}

  sendEMail(createdUserMessageDto: CreatedUserMessageDto) {
    this.logger.log(
      'info',
      `EMAIL::SEND_MAIL Request recieved: ${JSON.stringify(createdUserMessageDto)}`,
    );
    console.log(`EMAIL :: Email was sent successfully`, createdUserMessageDto);
  }
}
