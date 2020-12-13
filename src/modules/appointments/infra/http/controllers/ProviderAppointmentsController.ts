import ListProvidersAppointmentsService from '@modules/appointments/services/ListProvidersAppointmentsService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ProviderAppointmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const provider_id = request.user.id;
        const { day, month, year } = request.body;
        const listProviderAppointments = container.resolve(
            ListProvidersAppointmentsService,
        );

        const appointments = await listProviderAppointments.execute({
            day,
            month,
            year,
            provider_id,
        });

        return response.json(appointments).status(200);
    }
}

export default ProviderAppointmentsController;
