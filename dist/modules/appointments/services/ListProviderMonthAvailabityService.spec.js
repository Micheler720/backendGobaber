"use strict";

var _FakeAppointmentRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentRepository"));

var _ListProviderMonthAvailabityService = _interopRequireDefault(require("./ListProviderMonthAvailabityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let listProviderMonthAvailabity;
let fakeAppointmentRepository;
describe('ListProviderMonthAvailabity', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new _FakeAppointmentRepository.default();
    listProviderMonthAvailabity = new _ListProviderMonthAvailabityService.default(fakeAppointmentRepository);
  });
  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 3, 21, 8, 0, 0),
      user_id: 'user'
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 3, 20, 8, 0, 0),
      user_id: 'user'
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 3, 20, 9, 0, 0),
      user_id: 'user'
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 3, 20, 10, 0, 0),
      user_id: 'user'
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 3, 20, 11, 0, 0),
      user_id: 'user'
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 3, 20, 12, 0, 0),
      user_id: 'user'
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 3, 20, 13, 0, 0),
      user_id: 'user'
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 3, 20, 14, 0, 0),
      user_id: 'user'
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 3, 20, 15, 0, 0),
      user_id: 'user'
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 3, 20, 16, 0, 0),
      user_id: 'user'
    });
    await fakeAppointmentRepository.create({
      provider_id: 'user',
      date: new Date(2020, 3, 20, 17, 0, 0),
      user_id: 'user'
    });
    const availability = await listProviderMonthAvailabity.execute({
      month: 4,
      provider_id: 'user',
      year: 2020
    });
    expect(availability).toEqual(expect.arrayContaining([{
      day: 20,
      available: false
    }, {
      day: 21,
      available: true
    }, {
      day: 19,
      available: true
    }, {
      day: 18,
      available: true
    }]));
  });
});