import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';
import UpdateProfileService from './UpdateProfileService';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let updateProfileService: UpdateProfileService;

describe('UpdateProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();

    updateProfileService = new UpdateProfileService(fakeUsersRepository, fakeHashProvider);

    it('should be able to update profile', async () => {
      const user = await fakeUsersRepository.create({ name: 'John Doe', email: 'JD@fake.com', password: '123456' });

      const updatedUser = await updateProfileService.execute({
        user_id: user.id,
        name: 'John Doez',
        email: 'JDA@fake.com',
      });

      expect(updatedUser.name).toBe('John Doez');
      expect(updatedUser.email).toBe('JDA@fake.com');
    });

    it('should not be able to change another user email', async () => {
      await fakeUsersRepository.create({ name: 'John Doe', email: 'JD@fake.com', password: '123456' });

      const user = await fakeUsersRepository.create({ name: 'John Doe2', email: 'JD2@fake.com', password: '123456' });

      await expect(
        updateProfileService.execute({
          user_id: user.id,
          name: 'John Doe',
          email: 'JD@fake.com',
        }),
      ).rejects.toBeInstanceOf(AppError);
    });

    it('should be able update the password', async () => {
      const user = await fakeUsersRepository.create({ name: 'John Doe', email: 'JD@fake.com', password: '123456' });

      const updatedUser = await updateProfileService.execute({
        user_id: user.id,
        name: 'John Doez',
        email: 'JDA@fake.com',
        password: '1234567',
        old_password: '123456',
      });

      expect(updatedUser.password).toBe('1234567');
    });

    it('should not be able update the password without oldpassword', async () => {
      const user = await fakeUsersRepository.create({ name: 'John Doe', email: 'JD@fake.com', password: '123456' });

      await expect(
        updateProfileService.execute({
          user_id: user.id,
          name: 'John Doez',
          email: 'JDA@fake.com',
          password: '1234567',
        }),
      ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able update the password with wrong old password', async () => {
      const user = await fakeUsersRepository.create({ name: 'John Doe', email: 'JD@fake.com', password: '123456' });

      await expect(
        updateProfileService.execute({
          user_id: user.id,
          name: 'John Doez',
          email: 'JDA@fake.com',
          password: '1234567',
          old_password: 'asdsadas',
        }),
      ).rejects.toBeInstanceOf(AppError);
    });
  });
});
