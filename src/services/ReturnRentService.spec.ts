import AppError from '../helpers/AppError';
import FakeRentsRepository from '../repositories/fakes/FakeRentsRepository';
import FakeMoviesRepository from '../repositories/fakes/FakeMoviesRepository';
import CreateRentService from './CreateRentService';
import ReturnRentService from './ReturnRentService';

describe('ReturnRentService', () => {
    it('should be able to return a rented movie', async () => {
        const rentsRepository = new FakeRentsRepository();
        const moviesRepository = new FakeMoviesRepository();
        const returnRentService = new ReturnRentService(
            rentsRepository,
            moviesRepository,
        );

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

        const movieReturn = await returnRentService.execute(rent.id);

        expect(movieReturn).toHaveProperty('return_date');
        expect(movieReturn.return_date).toBeTruthy();
    });
    it('should not be able to return a non-existing rent', async () => {
        const rentsRepository = new FakeRentsRepository();
        const moviesRepository = new FakeMoviesRepository();
        const returnRentService = new ReturnRentService(
            rentsRepository,
            moviesRepository,
        );

        await expect(
            returnRentService.execute('some-rent-id'),
        ).rejects.toBeInstanceOf(AppError);
    });
});
