"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _ensureAuthencated = _interopRequireDefault(require("../../../../users/infra/http/middleware/ensureAuthencated"));

var _AppointmentsController = _interopRequireDefault(require("../controllers/AppointmentsController"));

var _ProviderAppointmentsController = _interopRequireDefault(require("../controllers/ProviderAppointmentsController"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const appointmenstsRouter = (0, _express.Router)();
appointmenstsRouter.use(_ensureAuthencated.default);
const appointmentsController = new _AppointmentsController.default();
const providerAppointmentsController = new _ProviderAppointmentsController.default();
appointmenstsRouter.post('/', (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    provider_id: _celebrate.Joi.string().uuid().required(),
    date: _celebrate.Joi.date().required()
  }
}), appointmentsController.create);
appointmenstsRouter.get('/me', providerAppointmentsController.index);
var _default = appointmenstsRouter;
exports.default = _default;