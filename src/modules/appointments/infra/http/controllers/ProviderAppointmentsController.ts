import ListProvidersAppointmentsService from '@modules/appointments/services/ListProvidersAppointmentsService';
import { classToClass } from 'class-transformer';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class ProviderAppointmentsController {
    public async index(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const provider_id = request.user.id;
        const { day, month, year } = request.query;
        const listProviderAppointments = container.resolve(
            ListProvidersAppointmentsService,
        );

        const appointments = await listProviderAppointments.execute({
            day: Number(day),
            month: Number(month),
            year: Number(year),
            provider_id,
        });

        return response.json(classToClass(appointments)).status(200);
    }
}

export default ProviderAppointmentsController;
