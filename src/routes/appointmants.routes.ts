import { Router } from 'express';
import { parseISO } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import CreateAppointmentService from '../services/CreateAppointmentService';
import ensuredAuthenticate from '../middleware/ensureAuthencated';

const appointmenstsRouter = Router();
appointmenstsRouter.use(ensuredAuthenticate);

appointmenstsRouter.get('/', async (request, response) => {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appointments = await appointmentsRepository.find();
    return response.status(200).json(appointments);
});

appointmenstsRouter.post('/', async (request, response) => {
    try {
        const { provider_id, date } = request.body;
        const parsetDate = parseISO(date);
        const createService = new CreateAppointmentService();
        const appointment = await createService.execute({
            provider_id,
            date: parsetDate,
        });
        return response.json(appointment);
    } catch (err) {
        return response.status(400).json({ error: err.message });
    }
});

export default appointmenstsRouter;
