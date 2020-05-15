import { Router, Request, Response } from 'express';
import CreateUserService from '@modules/users/services/CreateUserService';
import multer from 'multer';
import uploadConfig from '@config/upload';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UsersRepository from '@modules/users/infra/typeorm/repositories/UsersRepository';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    const usersRepository = new UsersRepository();
    const createUser = new CreateUserService(usersRepository);

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  console.info(request.file);

  const usersRepository = new UsersRepository();
  const updateUserAvatarService = new UpdateUserAvatarService(usersRepository);

  const user = await updateUserAvatarService.execute({
    user_id: request.user.id,
    avatar_filename: request.file.filename,
  });

  return response.json(user);
});

export default usersRouter;
