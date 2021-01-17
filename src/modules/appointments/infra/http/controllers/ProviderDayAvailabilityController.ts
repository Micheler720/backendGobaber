import ListProviderDayAvailabityService from '@modules/appointments/services/ListProviderDayAvailabityService';
import { container } from 'tsyringe';
import { Request, Response } from 'express';

class ProviderDayAvailabilityController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id } = request.params;
        const { month, year, day } = request.query;
        const listProviderDayAvailability = container.resolve(
            ListProviderDayAvailabityService,
        );
        const hourDayAvailability = await listProviderDayAvailability.execute({
            provider_id,
            day: Number(day),
            month: Number(month),
            year: Number(year),
        });
        return response.json(hourDayAvailability).status(200);
    }
}
export default ProviderDayAvailabilityController;
