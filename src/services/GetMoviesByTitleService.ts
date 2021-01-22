import Movie from '../models/Movie';
import IMoviesRepository from '../repositories/interfaces/IMoviesRepository';

class GetMoviesByTitleService {
    constructor(private moviesRepository: IMoviesRepository) {}

    public async execute(title: string): Promise<Movie[] | void> {
        const movies = await this.moviesRepository.findByTitle(title);

        return movies;
    }
}

export default GetMoviesByTitleService;
