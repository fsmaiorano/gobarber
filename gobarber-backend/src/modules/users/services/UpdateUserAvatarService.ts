import { getRepository } from 'typeorm';
import path from 'path';
import fs from 'fs';
import AppError from '@shared/errors/AppError';

import uploadConfig from '@config/upload';
import User from '../infra/typeorm/entities/User';

interface Request {
  user_id: string;
  avatar_filename: string;
}
class UpdateUserAvatarService {
  public async execute({ user_id, avatar_filename }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { user_id } });

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
    await userRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
