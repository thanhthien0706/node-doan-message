export interface IMailservice {
  sendMail(content: string, subject: string, toEmail: string): Promise<any>;
}
