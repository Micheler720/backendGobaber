import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

class ProvidersController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const listProviders = container.resolve(ListProvidersService);
        const providers = await listProviders.execute({
            user_id,
        });
        return response.json(classToClass(providers)).status(200);
    }
}
export default ProvidersController;
