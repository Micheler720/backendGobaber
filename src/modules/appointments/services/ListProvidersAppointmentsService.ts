import ICacheProvider from '@shared/container/providers/CacheProvider/models/ICacheProvider';
import { classToClass } from 'class-transformer';
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

        @inject('CacheProvider')
        private cacheProvider: ICacheProvider,
    ) {}

    public async execute({
        provider_id,
        day,
        month,
        year,
    }: IRequest): Promise<Appointment[]> {
        const cacheKey = `providers-appointments:${provider_id}:${year}-${month}-${day}`;
        let appointments = await this.cacheProvider.recover<Appointment[]>(
            cacheKey,
        );
        if (!appointments) {
            appointments = await this.appointmentRepository.findAllInDayProvider(
                {
                    day,
                    month,
                    provider_id,
                    year,
                },
            );

            await this.cacheProvider.save(cacheKey, classToClass(appointments));
        }
        return appointments;
    }
}

export default ListProvidersAppointmentsService;
