import express from 'express';
import MoviesController from '../controllers/MoviesController';
import checkAuthentication from '../middlewares/checkAuthentication';

const moviesRouter = express();
const moviesController = new MoviesController();

moviesRouter.use(checkAuthentication);

moviesRouter.get('/', moviesController.list);
moviesRouter.get('/search', moviesController.find);

export default moviesRouter;
