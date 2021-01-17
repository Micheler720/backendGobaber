"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ListProviderDayAvailabityService = _interopRequireDefault(require("../../../services/ListProviderDayAvailabityService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProviderDayAvailabilityController {
  async index(request, response) {
    const {
      provider_id
    } = request.params;
    const {
      month,
      year,
      day
    } = request.query;

    const listProviderDayAvailability = _tsyringe.container.resolve(_ListProviderDayAvailabityService.default);

    const hourDayAvailability = await listProviderDayAvailability.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year)
    });
    return response.json(hourDayAvailability).status(200);
  }

}

var _default = ProviderDayAvailabilityController;
exports.default = _default;