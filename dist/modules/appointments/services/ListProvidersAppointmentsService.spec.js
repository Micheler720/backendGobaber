"use strict";

var _FakeCacheProvider = _interopRequireDefault(require("../../../shared/container/providers/CacheProvider/Fakes/FakeCacheProvider"));

var _FakeAppointmentRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentRepository"));

var _ListProvidersAppointmentsService = _interopRequireDefault(require("./ListProvidersAppointmentsService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAppointmentsRepository;
let listProvidersAppointment;
let fakeCacheProvider;
describe('ListProviderAppointmentsSevice', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new _FakeAppointmentRepository.default();
    fakeCacheProvider = new _FakeCacheProvider.default();
    listProvidersAppointment = new _ListProvidersAppointmentsService.default(fakeAppointmentsRepository, fakeCacheProvider);
  });
  it('should be able  to list the appointments on a specific day.', async () => {
    const appointment1 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0)
    });
    const appointment2 = await fakeAppointmentsRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0)
    });
    const appointments = await listProvidersAppointment.execute({
      day: 20,
      month: 5,
      provider_id: 'provider',
      year: 2020
    });
    expect(appointments).toEqual([appointment1, appointment2]);
  });
});