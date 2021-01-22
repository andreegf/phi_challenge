import Movie from '../models/Movie';
import IMoviesRepository from '../repositories/interfaces/IMoviesRepository';

class GetAvailableMoviesService {
    constructor(private moviesRepository: IMoviesRepository) {}

    public async execute(): Promise<Movie[] | void> {
        const movies = await this.moviesRepository.listAvailable();

        return movies;
    }
}

export default GetAvailableMoviesService;
