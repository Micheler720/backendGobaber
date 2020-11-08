import { Router } from 'express';
import multer from 'multer';
import configUpload from '../config/upload';
import ensuredAuthenticate from '../middleware/ensureAuthencated';
import CreateUserService from '../services/CreateUserService';
import UpdateUsersAvatarService from '../services/UpdateUsersAvatarService';

const usersRouter = Router();
const upload = multer(configUpload);

usersRouter.post('/', async (request, response) => {
    try {
        const createService = new CreateUserService();
        const { name, password, email } = request.body;
        const user = await createService.execute({ name, password, email });
        delete user.password;
        return response.json(user);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

usersRouter.patch(
    '/avatar',
    ensuredAuthenticate,
    upload.single('avatar'),
    async (request, response) => {
        try {
            const updateServiceAvatar = new UpdateUsersAvatarService();
            const user = await updateServiceAvatar.execute({
                user_id: request.user.id,
                avatarFileName: request.file.filename,
            });
            delete user.password;
            return response.status(200).json(user);
        } catch (erro) {
            return response.status(400).json({ error: erro.message });
        }
    },
);

export default usersRouter;
