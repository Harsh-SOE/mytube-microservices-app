export interface SendMailOptions {
  to: string;
  from?: string;
  subject: string;
  content: string;
  replyTo?: string;
}
