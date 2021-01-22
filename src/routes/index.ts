import { Router } from 'express';
import usersRouter from './users.routes';
import sessionsRouter from './sessions.routes';
import moviesRouter from './movies.routes';
import rentsRouter from './rents.routes';

const routes = Router();

routes.use('/users', usersRouter);
routes.use('/auth', sessionsRouter);
routes.use('/movies', moviesRouter);
routes.use('/rents', rentsRouter);

export default routes;
