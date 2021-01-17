import FakeAppointmentsRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository';
import ListProviderMonthAvailabityService from './ListProviderMonthAvailabityService';

let listProviderMonthAvailabity: ListProviderMonthAvailabityService;
let fakeAppointmentRepository: FakeAppointmentsRepository;

describe('ListProviderMonthAvailabity', () => {
    beforeEach(() => {
        fakeAppointmentRepository = new FakeAppointmentsRepository();
        listProviderMonthAvailabity = new ListProviderMonthAvailabityService(
            fakeAppointmentRepository,
        );
    });

    it('should be able to list the month availability from provider', async () => {
        await fakeAppointmentRepository.create({
            provider_id: 'user',
            date: new Date(2020, 3, 21, 8, 0, 0),
            user_id: 'user',
        });
        await fakeAppointmentRepository.create({
            provider_id: 'user',
            date: new Date(2020, 3, 20, 8, 0, 0),
            user_id: 'user',
        });
        await fakeAppointmentRepository.create({
            provider_id: 'user',
            date: new Date(2020, 3, 20, 9, 0, 0),
            user_id: 'user',
        });
        await fakeAppointmentRepository.create({
            provider_id: 'user',
            date: new Date(2020, 3, 20, 10, 0, 0),
            user_id: 'user',
        });
        await fakeAppointmentRepository.create({
            provider_id: 'user',
            date: new Date(2020, 3, 20, 11, 0, 0),
            user_id: 'user',
        });
        await fakeAppointmentRepository.create({
            provider_id: 'user',
            date: new Date(2020, 3, 20, 12, 0, 0),
            user_id: 'user',
        });
        await fakeAppointmentRepository.create({
            provider_id: 'user',
            date: new Date(2020, 3, 20, 13, 0, 0),
            user_id: 'user',
        });
        await fakeAppointmentRepository.create({
            provider_id: 'user',
            date: new Date(2020, 3, 20, 14, 0, 0),
            user_id: 'user',
        });
        await fakeAppointmentRepository.create({
            provider_id: 'user',
            date: new Date(2020, 3, 20, 15, 0, 0),
            user_id: 'user',
        });
        await fakeAppointmentRepository.create({
            provider_id: 'user',
            date: new Date(2020, 3, 20, 16, 0, 0),
            user_id: 'user',
        });
        await fakeAppointmentRepository.create({
            provider_id: 'user',
            date: new Date(2020, 3, 20, 17, 0, 0),
            user_id: 'user',
        });
        const availability = await listProviderMonthAvailabity.execute({
            month: 4,
            provider_id: 'user',
            year: 2020,
        });

        expect(availability).toEqual(
            expect.arrayContaining([
                { day: 20, available: false },
                { day: 21, available: true },
                { day: 19, available: true },
                { day: 18, available: true },
            ]),
        );
    });
});
