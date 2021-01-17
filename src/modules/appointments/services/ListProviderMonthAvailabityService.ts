import { inject, injectable } from 'tsyringe';
import { getDaysInMonth, getDate, isAfter } from 'date-fns';
import IAppointmensRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    month: number;
    provider_id: string;
    year: number;
}

type IResponse = Array<{
    day: number;
    available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentRepository: IAppointmensRepository,
    ) {}

    public async execute({
        month,
        year,
        provider_id,
    }: IRequest): Promise<IResponse> {
        const appointmentsProviderMonth = await this.appointmentRepository.findAllInMonthProvider(
            {
                month,
                provider_id,
                year,
            },
        );
        const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));
        const eachDayArray = Array.from(
            { length: numberOfDaysInMonth },
            (_, index) => index + 1,
        );
        const availability = eachDayArray.map(day => {
            const compareDate = new Date(year, month - 1, day, 23, 59, 59);

            const appointmentsInDay = appointmentsProviderMonth.filter(
                appointment => {
                    return getDate(appointment.date) === day;
                },
            );
            return {
                day,
                available:
                    isAfter(compareDate, new Date()) &&
                    appointmentsInDay.length < 10,
            };
        });
        return availability;
    }
}

export default ListProviderMonthAvailabityService;
