import { Router } from 'express';
import appointmenstsRouter from './appointmants.routes';
import usersRoutes from './users.routes';
import sessionsRouter from './sessions.routes';

const routes = Router();

routes.use('/appointments', appointmenstsRouter);
routes.use('/users', usersRoutes);
routes.use('/sessions', sessionsRouter);

export default routes;
