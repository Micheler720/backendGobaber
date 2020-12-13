"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var ensureAuthencated_1 = __importDefault(require("@modules/users/infra/http/middleware/ensureAuthencated"));
var AppointmentsController_1 = __importDefault(require("../controllers/AppointmentsController"));
var appointmenstsRouter = express_1.Router();
appointmenstsRouter.use(ensureAuthencated_1.default);
var appointmentsController = new AppointmentsController_1.default();
/* appointmenstsRouter.get('/', async (request, response) => {
    const appointments = await appointmentsRepository.find();
    return response.status(200).json(appointments);
}); */
appointmenstsRouter.post('/', appointmentsController.create);
exports.default = appointmenstsRouter;
