import { Request, Response } from 'express';
import MoviesRepository from '../repositories/MoviesRepository';
import RentsRepository from '../repositories/RentsRepository';
import CreateRentService from '../services/CreateRentService';
import ReturnRentService from '../services/ReturnRentService';

class RentsController {
    public async create(req: Request, res: Response): Promise<Response> {
        const rentsRepository = new RentsRepository();
        const moviesRepository = new MoviesRepository();
        const createRentService = new CreateRentService(
            rentsRepository,
            moviesRepository,
        );

        const user_id = req.user.id;
        const { movie_id, start_date } = req.body;

        const rent = await createRentService.execute({
            user_id,
            movie_id,
            start_date,
        });

        return res.json(rent);
    }

    public async save(req: Request, res: Response): Promise<Response> {
        const rentsRepository = new RentsRepository();
        const moviesRepository = new MoviesRepository();
        const returnRentService = new ReturnRentService(
            rentsRepository,
            moviesRepository,
        );

        const { rent_id } = req.params;

        const rent = await returnRentService.execute(rent_id);

        return res.json(rent);
    }
}

export default RentsController;
