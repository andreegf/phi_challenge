import { uuid } from 'uuidv4';
import IMoviesRepository from '../interfaces/IMoviesRepository';
import Movie from '../../models/Movie';
import ICreateMovieDTO from '../../dtos/ICreateMovieDTO';

class FakeMoviesRepository implements IMoviesRepository {
    private movies: Movie[] = [];

    public async findById(id: string): Promise<Movie | void> {
        const foundMovie = await this.movies.find(movie => movie.id === id);

        return foundMovie;
    }

    public async findByTitle(title: string): Promise<Movie[] | void> {
        const search = new RegExp(title, 'i');
        const foundMovies = await this.movies.filter(movie =>
            search.test(movie.title),
        );

        return foundMovies;
    }

    public async listAvailable(): Promise<Movie[] | void> {
        const foundMovies = await this.movies.filter(
            movie => movie.quantity > 0,
        );

        return foundMovies;
    }

    public async save(movie: Movie): Promise<Movie> {
        const foundMovie = await this.movies.findIndex(
            movieList => movieList.id === movie.id,
        );

        this.movies[foundMovie] = movie;

        return movie;
    }

    public async create(movie_data: ICreateMovieDTO): Promise<Movie> {
        const movie = new Movie();

        Object.assign(movie, { id: uuid() }, movie_data);

        this.movies.push(movie);

        return movie;
    }
}

export default FakeMoviesRepository;
