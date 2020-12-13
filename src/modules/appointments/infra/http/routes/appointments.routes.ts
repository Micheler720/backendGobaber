import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ensuredAuthenticate from '@modules/users/infra/http/middleware/ensureAuthencated';
import AppointmentsController from '../controllers/AppointmentsController';
import ProviderAppointmentsController from '../controllers/ProviderAppointmentsController';

const appointmenstsRouter = Router();
appointmenstsRouter.use(ensuredAuthenticate);
const appointmentsController = new AppointmentsController();
const providerAppointmentsController = new ProviderAppointmentsController();

appointmenstsRouter.post(
    '/',
    celebrate({
        [Segments.BODY]: {
            provider_id: Joi.string().uuid().required(),
            date: Joi.date().required(),
        },
    }),
    appointmentsController.create,
);
appointmenstsRouter.get('/me', providerAppointmentsController.index);

export default appointmenstsRouter;
