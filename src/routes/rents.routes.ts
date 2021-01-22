import express from 'express';
import RentsController from '../controllers/RentsController';
import checkAuthentication from '../middlewares/checkAuthentication';

const rentsRouter = express();
const rentsController = new RentsController();

rentsRouter.use(checkAuthentication);
rentsRouter.post('/', rentsController.create);
rentsRouter.patch('/return/:rent_id', rentsController.save);

export default rentsRouter;
