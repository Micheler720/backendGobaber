"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ListProviderMonthAvailabityService = _interopRequireDefault(require("../../../services/ListProviderMonthAvailabityService"));

var _tsyringe = require("tsyringe");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ProviderMonthAvailabilityController {
  async index(request, response) {
    const {
      provider_id
    } = request.params;
    const {
      month,
      year
    } = request.query;

    const listProviderMonthAvailability = _tsyringe.container.resolve(_ListProviderMonthAvailabityService.default);

    const dayMonthAvailability = await listProviderMonthAvailability.execute({
      month: Number(month),
      provider_id,
      year: Number(year)
    });
    return response.json(dayMonthAvailability).status(200);
  }

}

var _default = ProviderMonthAvailabilityController;
exports.default = _default;