import { Router, Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import multer from 'multer';
import uploadConfig from '../config/upload';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';

const usersRouter = Router();
const upload = multer(uploadConfig);

usersRouter.post('/', async (request: Request, response: Response) => {
  try {
    const { name, email, password } = request.body;

    const createUser = new CreateUserService();

    const user = await createUser.execute({ name, email, password });

    delete user.password;

    return response.json(user);
  } catch (error) {
    response.status(400).json({ error: error.message });
  }
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  console.info(request.file);

  var updateUserAvatarService = new UpdateUserAvatarService();

  const user = await updateUserAvatarService.execute({
    user_id: request.user.id,
    avatar_filename: request.file.filename,
  });

  return response.json(user);
});

export default usersRouter;
