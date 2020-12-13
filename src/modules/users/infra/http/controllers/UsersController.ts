import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import UserMap from '@modules/users/mappers/UserMap';

export default class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        try {
            const createService = container.resolve(CreateUserService);
            const { name, password, email } = request.body;
            const user = await createService.execute({ name, password, email });
            const mappedUser = UserMap.toDTO(user);
            return response.json(mappedUser);
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }
}
