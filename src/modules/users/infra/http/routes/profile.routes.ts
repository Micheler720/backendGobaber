import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import ProfileController from '../controllers/ProfileController';
import ensureAuthencated from '../middleware/ensureAuthencated';

const profileRouter = Router();
const profileController = new ProfileController();

profileRouter.use(ensureAuthencated);

profileRouter.put(
    '/',
    celebrate({
        [Segments.BODY]: {
            name: Joi.string().required(),
            email: Joi.string().required().email(),
            password: Joi.string(),
            password_confirmation: Joi.string().valid(Joi.ref('password')),
            old_password: Joi.string(),
        },
    }),
    profileController.update,
);
profileRouter.get('/', profileController.show);

export default profileRouter;
