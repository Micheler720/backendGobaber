import { Router } from 'express';
import ensuredAuthenticate from '../middleware/ensureAuthencated';
import CreateUserService from '../services/CreateUserService';

const usersRouter = Router();

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

usersRouter.patch('/avatar', ensuredAuthenticate, (request, response) => {
    return response.json({ message: 'ok' });
});

export default usersRouter;
