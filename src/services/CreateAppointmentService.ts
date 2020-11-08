import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';

interface Request {
    date: Date;
    provider_id: string;
}

class CreateAppointmentService {
    public async execute({ provider_id, date }: Request): Promise<Appointment> {
        const appointmentDate = startOfHour(date);
        const appointmentsRepository = getCustomRepository(
            AppointmentsRepository,
        );

        const findApponitmentInSameDate = await appointmentsRepository.findByDate(
            appointmentDate,
        );
        if (findApponitmentInSameDate) {
            throw Error('This appointment is already booked');
        }
        const appointment = appointmentsRepository.create({
            provider_id,
            date: appointmentDate,
        });
        await appointmentsRepository.save(appointment);
        return appointment;
    }
}
export default CreateAppointmentService;
