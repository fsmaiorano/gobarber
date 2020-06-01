import ISendMailDTO from '../dto/ISendMailDTO';

interface IMessage {
  to: string;
  body: string;
}

export default class FakeMailProvider {
  private messages: ISendMailDTO[] = [];

  public async sendMail(message: ISendMailDTO): Promise<void> {
    this.messages.push(message);
  }
}
