import { getRepository, ILike, Like, MoreThan, Repository } from 'typeorm';
import ICreateMovieDTO from '../dtos/ICreateMovieDTO';
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

    public async findById(id: string): Promise<Movie | void> {
        const movie = await this.ormRepository.findOne(id);

        return movie;
    }

    public async save(movie: Movie): Promise<Movie> {
        await this.ormRepository.save(movie);

        return movie;
    }

    public async create(movie_data: ICreateMovieDTO): Promise<Movie> {
        const movie = await this.ormRepository.create(movie_data);

        await this.ormRepository.save(movie);

        return movie;
    }
}

export default MoviesRepository;
