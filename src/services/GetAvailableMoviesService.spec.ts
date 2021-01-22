import FakeMoviesRepository from '../repositories/fakes/FakeMoviesRepository';
import GetAvailableMoviesService from './GetAvailableMoviesService';

describe('GetAvailableMoviesService', () => {
    it('should list all movies with at least 1 quantity', async () => {
        const moviesRepository = new FakeMoviesRepository();
        const getAvailableMoviesService = new GetAvailableMoviesService(
            moviesRepository,
        );

        await moviesRepository.create({
            title: 'Test',
            director: 'Director',
            quantity: 1,
        });

        const movies = await getAvailableMoviesService.execute();

        expect(movies).toBeInstanceOf(Array);
    });
});
