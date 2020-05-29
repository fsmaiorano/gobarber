import 'reflect-metadata';
import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import SendForgotPasswordEmailService from './SendForgotPasswordEmailService';

describe('SendForgotPasswordEmailService', () => {
  it('Should be able to recover the password using a valid e-mail', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendEmail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmailService = new SendForgotPasswordEmailService(fakeUsersRepository, fakeMailProvider);

    await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    });

    await sendForgotPasswordEmailService.execute({
      email: 'johndoe@example.com',
    });

    expect(sendEmail).toHaveBeenCalled();
  });

  it('Should not be able to recover the password using a invalid e-mail', async () => {});

  it('Should generate a forgot password token', async () => {});
});
