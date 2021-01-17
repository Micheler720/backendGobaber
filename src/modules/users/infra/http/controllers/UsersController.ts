import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateUserService from '@modules/users/services/CreateUserService';
import { classToClass } from 'class-transformer';

export default class UsersController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        try {
            const createService = container.resolve(CreateUserService);
            const { name, password, email } = request.body;
            const user = await createService.execute({ name, password, email });
            return response.json(classToClass(user));
        } catch (err) {
            return response.status(400).json({ error: err.message });
        }
    }
}
