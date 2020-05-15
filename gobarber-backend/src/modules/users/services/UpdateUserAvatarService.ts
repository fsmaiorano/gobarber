import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';

import uploadConfig from '@config/upload';
import IUsersRepository from '@modules/users/repositories/IUsersRepository';
import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  avatar_filename: string;
}
class UpdateUserAvatarService {
  constructor(private usersRepository: IUsersRepository) {}

  public async execute({ user_id, avatar_filename }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('Only authenticated users can change avatar', 401);
    }

    if (user.avatar) {
      //Verify if user avatar exists
      const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        // Remove user avatar
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    delete user.password;

    user.avatar = avatar_filename; // Update user avatar
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
