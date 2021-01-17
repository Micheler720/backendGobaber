import { isBefore, startOfHour, getHours, format } from 'date-fns';
import { injectable, inject } from 'tsyringe';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import AppError from '@shared/errors/AppError';
import IAppointmensRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import INotificationsRepository from '@modules/notifications/repositories/INotificationsRepository';
import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';

interface Request {
    date: Date;
    provider_id: string;
    user_id: string;
}

@injectable()
class CreateAppointmentService {
    constructor(
        @inject('AppointmentsRepository')
        private appointsmentRepository: IAppointmensRepository,

        @inject('NotificationsRepository')
        private notificationsRepository: INotificationsRepository,

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        provider_id,
        date,
        user_id,
    }: Request): Promise<Appointment> {
        const appointmentDate = startOfHour(date);

        const cacheKey = `providers-appointments:${provider_id}:${format(
            appointmentDate,
            'yyyy-M-d',
        )}`;

        if (isBefore(appointmentDate, Date.now())) {
            throw new AppError(
                "You can't create  an appointment in past date.",
            );
        }

        if (user_id === provider_id) {
            throw new AppError("You can't create an appointment in yourself");
        }
        if (getHours(appointmentDate) < 8 || getHours(appointmentDate) > 17) {
            throw new AppError(
                "You can't create an appointment before 8am or after 17pm.",
            );
        }
        const findApponitmentInSameDate = await this.appointsmentRepository.findByDate(
            appointmentDate,
            provider_id,
        );
        if (findApponitmentInSameDate) {
            throw new AppError('This appointment is already booked');
        }
        const appointment = await this.appointsmentRepository.create({
            provider_id,
            date: appointmentDate,
            user_id,
        });

        const dateFormated = format(
            appointmentDate,
            "dd/MM/yyyy 'às' HH:mm'h'",
        );

        await this.notificationsRepository.create({
            recipient_id: provider_id,
            content: `Ǹovo agendamento para dia ${dateFormated}`,
        });
        await this.cacheProvider.invalidate(cacheKey);
        return appointment;
    }
}
export default CreateAppointmentService;
