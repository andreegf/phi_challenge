import AppError from '../helpers/AppError';
import Rent from '../models/Rent';
import IMoviesRepository from '../repositories/interfaces/IMoviesRepository';
import IRentsRepository from '../repositories/interfaces/IRentsRepository';

class ReturnRentService {
    constructor(
        private rentsRepository: IRentsRepository,
        private moviesRepository: IMoviesRepository,
    ) {}

    public async execute(rent_id: string): Promise<Rent> {
        const rent = await this.rentsRepository.findById(rent_id);

        if (!rent) {
            throw new AppError('Rent not found');
        }

        const { movie_id } = rent;

        const movie = await this.moviesRepository.findById(movie_id);

        if (!movie) {
            throw new AppError('movie not found');
        }

        movie.quantity += 1;
        movie.updated_at = new Date();

        rent.return_date = new Date();

        await this.rentsRepository.save(rent);

        await this.moviesRepository.save(movie);

        return rent;
    }
}

export default ReturnRentService;
