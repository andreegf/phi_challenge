import AppError from '../helpers/AppError';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUserService', () => {
    it('should be able to create a new user', async () => {
        const usersRepository = new FakeUsersRepository();
        const hashProvider = new FakeHashProvider();
        const createUserService = new CreateUserService(
            usersRepository,
            hashProvider,
        );

        const user = await createUserService.execute({
            name: 'Amanda',
            email: 'amanda@teste.com',
            password: '1234',
        });

        expect(user).toHaveProperty('id');
    });
    it('should not be able to create a user with same e-mail', async () => {
        const usersRepository = new FakeUsersRepository();
        const hashProvider = new FakeHashProvider();
        const createUserService = new CreateUserService(
            usersRepository,
            hashProvider,
        );

        await createUserService.execute({
            name: 'Amanda',
            email: 'amanda@teste.com',
            password: '1234',
        });

        await expect(
            createUserService.execute({
                name: 'Amanda',
                email: 'amanda@teste.com',
                password: '1234',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
