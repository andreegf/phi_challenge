import { Request, Response } from 'express';
import MoviesRepository from '../repositories/MoviesRepository';
import GetAvailableMoviesService from '../services/GetAvailableMoviesService';
import GetMoviesByTitleService from '../services/GetMoviesByTitleService';

class MoviesController {
    public async list(req: Request, res: Response): Promise<Response> {
        try {
            const moviesRepository = new MoviesRepository();
            const getAvailableMoviesService = new GetAvailableMoviesService(
                moviesRepository,
            );

            const movies = await getAvailableMoviesService.execute();

            return res.json(movies);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }

    public async find(req: Request, res: Response): Promise<Response> {
        try {
            const moviesRepository = new MoviesRepository();
            const getMoviesBytitleService = new GetMoviesByTitleService(
                moviesRepository,
            );
            const { title } = req.query;

            const movies = await getMoviesBytitleService.execute(
                title as string,
            );

            return res.json(movies);
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

export default MoviesController;
