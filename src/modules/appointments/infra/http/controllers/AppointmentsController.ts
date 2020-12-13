import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';

export default class AppointmentsController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { provider_id, date } = request.body;
        const parsetDate = parseISO(date);
        const createService = container.resolve(CreateAppointmentService);
        const appointment = await createService.execute({
            provider_id,
            date: parsetDate,
            user_id: request.user.id,
        });
        return response.json(appointment);
    }
}
