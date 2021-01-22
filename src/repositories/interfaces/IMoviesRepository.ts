import ICreateMovieDTO from '../../dtos/ICreateMovieDTO';
import Movie from '../../models/Movie';

export default interface IMoviesRepository {
    listAvailable(): Promise<Movie[] | void>;
    findByTitle(title: string): Promise<Movie[] | void>;
    findById(id: string): Promise<Movie | void>;
    save(movie: Movie): Promise<Movie>;
    create(movie_data: ICreateMovieDTO): Promise<Movie>;
}
