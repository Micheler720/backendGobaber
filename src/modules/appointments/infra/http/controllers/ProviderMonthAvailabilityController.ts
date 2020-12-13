import ListProviderMonthAvailabityService from '@modules/appointments/services/ListProviderMonthAvailabityService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ProviderMonthAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id } = request.params;
        const { month, year } = request.body;

        const listProviderMonthAvailability = container.resolve(
            ListProviderMonthAvailabityService,
        );

        const dayMonthAvailability = await listProviderMonthAvailability.execute(
            {
                month,
                provider_id,
                year,
            },
        );

        return response.json(dayMonthAvailability).status(200);
    }
}

export default ProviderMonthAvailabilityController;
