import { Request, Response } from 'express';
import UsersRepository from '../repositories/UsersRepository';
import HashProvider from '../providers/implementations/BcryptHashProvider';
import CreateUserService from '../services/CreateUserService';

class UsersController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const { name, email, password } = req.body;
            const usersRepository = new UsersRepository();
            const hashProvider = new HashProvider();
            const createUserService = new CreateUserService(
                usersRepository,
                hashProvider,
            );
            const user = await createUserService.execute({
                name,
                email,
                password,
            });

            return res.json({
                name: user.name,
                email: user.email,
                created_at: user.created_at,
            });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

export default UsersController;
