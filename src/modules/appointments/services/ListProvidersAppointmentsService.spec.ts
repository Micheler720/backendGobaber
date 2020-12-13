import FakeAppointmentsRepository from '../repositories/fakes/FakeAppointmentRepository';
import ListProvidersAppointmentsService from './ListProvidersAppointmentsService';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProvidersAppointment: ListProvidersAppointmentsService;

describe('ListProviderAppointmentsSevice', () => {
    beforeEach(() => {
        fakeAppointmentsRepository = new FakeAppointmentsRepository();
        listProvidersAppointment = new ListProvidersAppointmentsService(
            fakeAppointmentsRepository,
        );
    });
    it('should be able  to list the appointments on a specific day.', async () => {
        const appointment1 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 4, 20, 14, 0, 0),
        });
        const appointment2 = await fakeAppointmentsRepository.create({
            provider_id: 'provider',
            user_id: 'user',
            date: new Date(2020, 4, 20, 15, 0, 0),
        });
        const appointments = await listProvidersAppointment.execute({
            day: 20,
            month: 5,
            provider_id: 'provider',
            year: 2020,
        });

        expect(appointments).toEqual([appointment1, appointment2]);
    });
});
