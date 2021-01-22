import Movie from '../../models/Movie';

export default interface IMoviesRepository {
    listAvailable(): Promise<Movie[] | void>;
    findByTitle(title: string): Promise<Movie[] | void>;
}
