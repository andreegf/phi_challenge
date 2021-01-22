import AppError from '../helpers/AppError';
import FakeRentsRepository from '../repositories/fakes/FakeRentsRepository';
import FakeMoviesRepository from '../repositories/fakes/FakeMoviesRepository';
import CreateRentService from './CreateRentService';

describe('CreateRentService', () => {
    it('should be able to rent a movie', async () => {
        const rentsRepository = new FakeRentsRepository();
        const moviesRepository = new FakeMoviesRepository();
        const createRentService = new CreateRentService(
            rentsRepository,
            moviesRepository,
        );

        const movie = await moviesRepository.create({
            title: 'Test',
            director: 'Director',
            quantity: 1,
        });

        const rent = await createRentService.execute({
            movie_id: movie.id,
            user_id: 'some-user-id',
            start_date: new Date(),
        });

        expect(rent).toHaveProperty('id');
    });
    it('should not be able to rent a non-existing movie', async () => {
        const rentsRepository = new FakeRentsRepository();
        const moviesRepository = new FakeMoviesRepository();
        const createRentService = new CreateRentService(
            rentsRepository,
            moviesRepository,
        );

        await expect(
            createRentService.execute({
                movie_id: 'some-movie-id',
                user_id: 'some-user-id',
                start_date: new Date(),
            }),
        ).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to rent an unavailable movie', async () => {
        const rentsRepository = new FakeRentsRepository();
        const moviesRepository = new FakeMoviesRepository();
        const createRentService = new CreateRentService(
            rentsRepository,
            moviesRepository,
        );

        const movie = await moviesRepository.create({
            title: 'Test',
            director: 'Director',
            quantity: 0,
        });

        await expect(
            createRentService.execute({
                movie_id: movie.id,
                user_id: 'some-user-id',
                start_date: new Date(),
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
