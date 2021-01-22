import AppError from '../helpers/AppError';
import FakeHashProvider from '../providers/fakes/FakeHashProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import AuthenticateUserService from './AuthenticateUserService';
import CreateUserService from './CreateUserService';

describe('AuthenticateUserService', () => {
    it('should be able to authenticate a user', async () => {
        const usersRepository = new FakeUsersRepository();
        const hashProvider = new FakeHashProvider();
        const createUserService = new CreateUserService(
            usersRepository,
            hashProvider,
        );
        const authenticateUserService = new AuthenticateUserService(
            usersRepository,
            hashProvider,
        );

        const user = await createUserService.execute({
            name: 'Amanda',
            email: 'amanda@teste.com',
            password: '1234',
        });

        const response = await authenticateUserService.execute({
            email: 'amanda@teste.com',
            password: '1234',
        });

        expect(response).toHaveProperty('token');
        expect(response.user).toEqual(user);
    });
    it('should note be able to authenticate with non existing user', async () => {
        const usersRepository = new FakeUsersRepository();
        const hashProvider = new FakeHashProvider();

        const authenticateUserService = new AuthenticateUserService(
            usersRepository,
            hashProvider,
        );

        await expect(
            authenticateUserService.execute({
                email: 'amanda@teste.com',
                password: '1234',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
    it('should not be able to authenticate with wrong password', async () => {
        const usersRepository = new FakeUsersRepository();
        const hashProvider = new FakeHashProvider();
        const createUserService = new CreateUserService(
            usersRepository,
            hashProvider,
        );
        const authenticateUserService = new AuthenticateUserService(
            usersRepository,
            hashProvider,
        );

        const user = await createUserService.execute({
            name: 'Amanda',
            email: 'amanda@teste.com',
            password: '1234',
        });

        await expect(
            authenticateUserService.execute({
                email: 'amanda@teste.com',
                password: '123',
            }),
        ).rejects.toBeInstanceOf(AppError);
    });
});
