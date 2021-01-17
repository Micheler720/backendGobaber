"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _uuid = require("uuid");

var _Appointment = _interopRequireDefault(require("../../infra/typeorm/entities/Appointment"));

var _dateFns = require("date-fns");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class FakeAppointmentsRepository {
  constructor() {
    this.appointments = [];
  }

  async create({
    date,
    provider_id,
    user_id
  }) {
    const appointment = new _Appointment.default();
    Object.assign(appointment, {
      id: (0, _uuid.v4)(),
      provider_id,
      date,
      user_id
    });
    this.appointments.push(appointment);
    return appointment;
  }

  async findByDate(date, provider_id) {
    return this.appointments.find(appointment => (0, _dateFns.isEqual)(date, appointment.date) && appointment.provider_id === provider_id);
  }

  async findAllInMonthProvider({
    month,
    provider_id,
    year
  }) {
    const appointments = this.appointments.filter(findAppointment => findAppointment.provider_id === provider_id && (0, _dateFns.getMonth)(findAppointment.date) + 1 === month && (0, _dateFns.getYear)(findAppointment.date) === year);
    return appointments;
  }

  async findAllInDayProvider({
    day,
    month,
    year,
    provider_id
  }) {
    const appointments = this.appointments.filter(appointment => {
      return appointment.provider_id === provider_id && (0, _dateFns.getDate)(appointment.date) === day && (0, _dateFns.getMonth)(appointment.date) + 1 === month && (0, _dateFns.getYear)(appointment.date) === year;
    });
    return appointments;
  }

}

var _default = FakeAppointmentsRepository;
exports.default = _default;