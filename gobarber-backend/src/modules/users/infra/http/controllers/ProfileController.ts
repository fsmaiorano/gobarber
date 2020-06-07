import { Request, Response } from 'express';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { container } from 'tsyringe';
import ShowProfileService from '@modules/users/services/ShowProfileService';
import { classToClass } from 'class-transformer';

export default class ProfileController {
  public async show(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;

    const showProfile = container.resolve(ShowProfileService);

    const user = await showProfile.execute({ user_id });

    return response.json(classToClass(user));
  }

  public async update(request: Request, response: Response): Promise<Response> {
    try {
      const user_id = request.user.id;
      const { name, email, password, old_password } = request.body;

      const updateProfileService = container.resolve(UpdateProfileService);

      const user = await updateProfileService.execute({ user_id, name, email, password, old_password });

      delete user.password;

      return response.json(user);
    } catch (error) {
      return response.status(400).json({ error: error.message });
    }
  }
}
