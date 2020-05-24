import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';

import uploadConfig from '@config/upload';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  avatar_filename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository') private usersRepository: IUsersRepository,

    @inject('StorageProvider') private storageProvider: IStorageProvider,
  ) {}

  public async execute({ user_id, avatar_filename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      //Verify if user avatar exists
      const userAvatarFilePath = path.join(uploadConfig.tmpFolder, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        // Remove user avatar
        await this.storageProvider.deleteFile(user.avatar);
      }
    }

    const filename = await this.storageProvider.saveFile(avatar_filename);

    delete user.password;

    user.avatar = filename; // Update user avatar
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
