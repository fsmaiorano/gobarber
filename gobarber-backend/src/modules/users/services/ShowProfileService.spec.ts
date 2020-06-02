import 'reflect-metadata';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import ShowProfileService from './ShowProfileService';

let fakeUsersRepository: FakeUsersRepository;
let showProfile: ShowProfileService;

describe('ShowProfileService', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    showProfile = new ShowProfileService(fakeUsersRepository);

    it('should be able show profile', async () => {
      const user = await fakeUsersRepository.create({ name: 'John Doe', email: 'JD@fake.com', password: '123456' });

      const profile = await showProfile.execute({ user_id: user.id });

      expect(profile.name).toBe('John Doe');
      expect(profile.email).toBe('JD@fake.com');
    });

    it('should not be able show profile from non-existing user', async () => {
      await expect(showProfile.execute({ user_id: 'dsuoahdsuoahuodas' })).rejects.toBeInstanceOf(AppError);
    });
  });
});
