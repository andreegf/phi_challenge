import FakeMoviesRepository from '../repositories/fakes/FakeMoviesRepository';
import GetMoviesByTitleService from './GetMoviesByTitleService';

describe('GetMoviesByTitleService', () => {
    it('should be able to get a list of movies by sendind the title', async () => {
        const moviesRepository = new FakeMoviesRepository();
        const getMoviesByTitleService = new GetMoviesByTitleService(
            moviesRepository,
        );

        await moviesRepository.create({
            title: 'Test',
            director: 'Director',
            quantity: 1,
        });

        const movies = await getMoviesByTitleService.execute('Test');

        expect(movies).toBeInstanceOf(Array);
        expect(movies).toEqual(
            expect.arrayContaining([
                expect.objectContaining({
                    title: 'Test',
                }),
            ]),
        );
    });
});
