import IUserRepository from '@modules/users/repositories/IUsersRepository';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { getHours, isAfter } from 'date-fns';
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayFromProviderDTO';
import IAppointmensRepository from '../repositories/IAppointmentsRepository';

type IResponse = Array<{
    hour: number;
    available: boolean;
}>;

@injectable()
class ListProviderDayAvailabityService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentRepository: IAppointmensRepository,

        @inject('UsersRepository')
        private usersRepository: IUserRepository,
    ) {}

    public async execute({
        day,
        month,
        year,
        provider_id,
    }: IFindAllInDayFromProviderDTO): Promise<IResponse> {
        const provider = await this.usersRepository.findById(provider_id);
        if (!provider) {
            throw new AppError('Provider already');
        }
        const appointmentsProviderDay = await this.appointmentRepository.findAllInDayProvider(
            {
                day,
                month,
                provider_id,
                year,
            },
        );

        const eachHourArray = Array.from(
            { length: 10 },
            (_, index) => index + 8,
        );
        const currentDate = new Date(Date.now());

        const availability = eachHourArray.map(hour => {
            const hasAppointmentInHours = appointmentsProviderDay.find(
                appointment => getHours(appointment.date) === hour,
            );

            const compareDate = new Date(year, month - 1, day, hour);

            return {
                hour,
                available:
                    !hasAppointmentInHours && isAfter(compareDate, currentDate),
            };
        });
        return availability;
    }
}

export default ListProviderDayAvailabityService;
