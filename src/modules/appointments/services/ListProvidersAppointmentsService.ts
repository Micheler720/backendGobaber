import { inject, injectable } from 'tsyringe';
import Appointment from '../infra/typeorm/entities/Appointment';
import IAppointmensRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
    month: number;
    day: number;
    year: number;
    provider_id: string;
}

@injectable()
class ListProvidersAppointmentsService {
    constructor(
        @inject('AppointmentsRepository')
        private appointmentRepository: IAppointmensRepository,
    ) {}

    public async execute({
        provider_id,
        day,
        month,
        year,
    }: IRequest): Promise<Appointment[]> {
        const appointments = await this.appointmentRepository.findAllInDayProvider(
            {
                day,
                month,
                provider_id,
                year,
            },
        );
        return appointments;
    }
}

export default ListProvidersAppointmentsService;
