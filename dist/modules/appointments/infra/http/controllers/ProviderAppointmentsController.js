"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ListProvidersAppointmentsService = _interopRequireDefault(require("../../../services/ListProvidersAppointmentsService"));

var _classTransformer = require("class-transformer");

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProviderAppointmentsController {
  async index(request, response) {
    const provider_id = request.user.id;
    const {
      day,
      month,
      year
    } = request.query;

    const listProviderAppointments = _tsyringe.container.resolve(_ListProvidersAppointmentsService.default);

    const appointments = await listProviderAppointments.execute({
      day: Number(day),
      month: Number(month),
      year: Number(year),
      provider_id
    });
    return response.json((0, _classTransformer.classToClass)(appointments)).status(200);
  }

}

var _default = ProviderAppointmentsController;
exports.default = _default;