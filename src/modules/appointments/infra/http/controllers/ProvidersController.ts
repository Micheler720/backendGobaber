import ListProvidersService from '@modules/appointments/services/ListProvidersService';
import { container } from 'tsyringe';
import { Request, Response } from 'express';
import ProvidersMap from '@modules/appointments/mappers/ProviderMap';

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
        const providersMapped = ProvidersMap.toDTO(providers);
        return response.json(providersMapped).status(200);
    }
}
export default ProvidersController;
