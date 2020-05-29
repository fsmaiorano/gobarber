import { inject, injectable } from 'tsyringe';
//import AppError from '@shared/errors/AppError';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';
//import User from '../infra/typeorm/entities/User';

interface IRequest {
  email: string;
}

@injectable()
class ResetPasswordService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,
    @inject('MailProvider') private mailProvider: IMailProvider,
  ) {}

  public async execute({ email }: IRequest): Promise<void> {
    this.mailProvider.sendMail(email, 'Password Recovery');
  }
}

export default ResetPasswordService;
