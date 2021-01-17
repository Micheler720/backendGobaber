"use strict";

var _FakeUserRepository = _interopRequireDefault(require("../../users/repositories/fakes/FakeUserRepository"));

var _FakeAppointmentRepository = _interopRequireDefault(require("../repositories/fakes/FakeAppointmentRepository"));

var _ListProviderDayAvailabityService = _interopRequireDefault(require("./ListProviderDayAvailabityService"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let fakeAppointmentRepository;
let fakeUserRepository;
let listProviderDayAvailability;
describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new _FakeAppointmentRepository.default();
    fakeUserRepository = new _FakeUserRepository.default();
    listProviderDayAvailability = new _ListProviderDayAvailabityService.default(fakeAppointmentRepository, fakeUserRepository);
  });
  it('should be list to list the day availability from provider.', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 20, 11).getTime();
    });
    const user = await fakeUserRepository.create({
      email: 'teste@teste.com.br',
      name: 'Jonh Doe',
      password: '123456'
    });
    await fakeAppointmentRepository.create({
      date: new Date(2020, 4, 20, 8, 0, 0),
      provider_id: user.id,
      user_id: user.id
    });
    await fakeAppointmentRepository.create({
      date: new Date(2020, 4, 20, 10, 0, 0),
      provider_id: user.id,
      user_id: user.id
    });
    await fakeAppointmentRepository.create({
      date: new Date(2020, 4, 20, 15, 0, 0),
      provider_id: user.id,
      user_id: user.id
    });
    const availability = await listProviderDayAvailability.execute({
      day: 20,
      month: 5,
      provider_id: user.id,
      year: 2020
    });
    expect(availability).toEqual(expect.arrayContaining([{
      hour: 8,
      available: false
    }, {
      hour: 9,
      available: false
    }, {
      hour: 10,
      available: false
    }, {
      hour: 11,
      available: false
    }, {
      hour: 12,
      available: true
    }, {
      hour: 14,
      available: true
    }, {
      hour: 15,
      available: false
    }, {
      hour: 16,
      available: true
    }]));
  });
});