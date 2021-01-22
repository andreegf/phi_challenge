import ICreateRentDTO from '../dtos/ICreateRentDTO';
import IRentsRepository from '../repositories/interfaces/IRentsRepository';
import Rent from '../models/Rent';
import IUsersRepository from '../repositories/interfaces/IUsersRepository';
import IMoviesRepository from '../repositories/interfaces/IMoviesRepository';
import AppError from '../helpers/AppError';

class CreateRentService {
    constructor(
        private rentsRepository: IRentsRepository,
        private moviesRepository: IMoviesRepository,
    ) {}

    public async execute(rent_data: ICreateRentDTO): Promise<Rent> {
        const { movie_id } = rent_data;

        const movie = await this.moviesRepository.findById(movie_id);

        if (!movie) {
            throw new AppError('Movie not found');
        }

        if (movie.quantity === 0) {
            throw new AppError('Movie not available');
        }

        movie.quantity -= 1;
        movie.updated_at = new Date();

        await this.moviesRepository.save(movie);

        const rent = await this.rentsRepository.create(rent_data);

        return rent;
    }
}

export default CreateRentService;
