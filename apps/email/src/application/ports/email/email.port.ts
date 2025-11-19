import { SendMailOptions } from './options/send-mail.options';

export interface EmailPort {
  sendEmail(options: SendMailOptions): Promise<void>;
}

export const EMAIL = Symbol('EMAIL');
