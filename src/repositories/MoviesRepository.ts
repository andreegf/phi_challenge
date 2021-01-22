import { getRepository, ILike, Like, MoreThan, Repository } from 'typeorm';
import Movie from '../models/Movie';
import IMoviesRepository from './interfaces/IMoviesRepository';

class MoviesRepository implements IMoviesRepository {
    private ormRepository: Repository<Movie>;

    constructor() {
        this.ormRepository = getRepository(Movie);
    }

    public async listAvailable(): Promise<Movie[] | void> {
        const movies = await this.ormRepository.find({
            where: {
                quantity: MoreThan(0),
            },
        });

        return movies;
    }

    public async findByTitle(title: string): Promise<Movie[] | void> {
        const movies = await this.ormRepository.find({
            where: {
                title: ILike(`%${title}%`),
            },
        });

        return movies;
    }
}

export default MoviesRepository;
