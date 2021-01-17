import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';
import configUpload from '@config/upload';
import ensuredAuthenticate from '@modules/users/infra/http/middleware/ensureAuthencated';
import UsersController from '../controllers/UsersController';
import UsersAvatarController from '../controllers/UserAvatarController';

const usersRouter = Router();
const upload = multer(configUpload.multer);
const usersController = new UsersController();
const userAvatarController = new UsersAvatarController();

usersRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string().required(),
        },
    }),
    usersController.create,
);

usersRouter.patch(
    '/avatar',
    ensuredAuthenticate,
    upload.single('avatar'),
    userAvatarController.update,
);

export default usersRouter;
