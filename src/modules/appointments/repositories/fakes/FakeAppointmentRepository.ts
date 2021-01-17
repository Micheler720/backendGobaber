import { v4 as uuid } from 'uuid';
import IAppointmensRepository from '@modules/appointments/repositories/IAppointmentsRepository';
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment';
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentDTO';
import { isEqual, getMonth, getYear, getDate } from 'date-fns';
import IFindAllInMonthProviderDTO from '@modules/appointments/dtos/IFindAllInMonthProviderDTO';
import IFindAllInDayFromProviderDTO from '@modules/appointments/dtos/IFindAllInDayFromProviderDTO';

class FakeAppointmentsRepository implements IAppointmensRepository {
    private appointments: Appointment[] = [];

    public async create({
        date,
        provider_id,
        user_id,
    }: ICreateAppointmentDTO): Promise<Appointment> {
        const appointment = new Appointment();
        Object.assign(appointment, { id: uuid(), provider_id, date, user_id });
        this.appointments.push(appointment);
        return appointment;
    }

    public async findByDate(
        date: Date,
        provider_id: string,
    ): Promise<Appointment | undefined> {
        return this.appointments.find(
            appointment =>
                isEqual(date, appointment.date) &&
                appointment.provider_id === provider_id,
        );
    }

    public async findAllInMonthProvider({
        month,
        provider_id,
        year,
    }: IFindAllInMonthProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(
            findAppointment =>
                findAppointment.provider_id === provider_id &&
                getMonth(findAppointment.date) + 1 === month &&
                getYear(findAppointment.date) === year,
        );
        return appointments;
    }

    public async findAllInDayProvider({
        day,
        month,
        year,
        provider_id,
    }: IFindAllInDayFromProviderDTO): Promise<Appointment[]> {
        const appointments = this.appointments.filter(appointment => {
            return (
                appointment.provider_id === provider_id &&
                getDate(appointment.date) === day &&
                getMonth(appointment.date) + 1 === month &&
                getYear(appointment.date) === year
            );
        });
        return appointments;
    }
}

export default FakeAppointmentsRepository;
