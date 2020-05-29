import 'reflect-metadata';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import AppError from '@shared/errors/AppError';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatarService from './UpdateUserAvatarService';

describe('UpdateUserAvatarService', () => {
  it('should be able to update avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

    const user = await fakeUsersRepository.create({ name: 'John Doe', email: 'JD@fake.com', password: '123456' });

    await updateUserAvatar.execute({ user_id: user.id, avatar_filename: 'avatar.jpg' });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to update avatar from none existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

    updateUserAvatar.execute({ user_id: 'non-existing-user', avatar_filename: 'avatar.jpg' });

    expect(
      updateUserAvatar.execute({ user_id: 'non-existing-user', avatar_filename: 'avatar.jpg' }),
    ).rejects.toBeInstanceOf(AppError);
  });

  // it('should delete old avatar when updating new one', async () => {
  //   const fakeUsersRepository = new FakeUsersRepository();
  //   const fakeStorageProvider = new FakeStorageProvider();

  //   const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

  //   const updateUserAvatar = new UpdateUserAvatarService(fakeUsersRepository, fakeStorageProvider);

  //   const user = await fakeUsersRepository.create({ name: 'John Doe', email: 'JD@fake.com', password: '123456' });

  //   await updateUserAvatar.execute({ user_id: user.id, avatar_filename: 'avatar.jpg' });

  //   await updateUserAvatar.execute({ user_id: user.id, avatar_filename: 'avatar2.jpg' });

  //   expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
  //   expect(user.avatar).toBe('avatar2.jpg');
  // });
});
