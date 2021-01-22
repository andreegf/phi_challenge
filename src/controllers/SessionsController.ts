import { Request, Response } from 'express';
import BcryptHashProvider from '../providers/implementations/BcryptHashProvider';
import UsersRepository from '../repositories/UsersRepository';
import AuthenticateUserService from '../services/AuthenticateUserService';

class SessionsController {
    public async create(req: Request, res: Response): Promise<Response> {
        try {
            const { email, password } = req.body;

            const usersRepository = new UsersRepository();
            const hashProvider = new BcryptHashProvider();
            const authenticateUserService = new AuthenticateUserService(
                usersRepository,
                hashProvider,
            );

            const { user, token } = await authenticateUserService.execute({
                email,
                password,
            });

            return res.json({
                name: user.name,
                email: user.email,
                token,
            });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    }
}

export default SessionsController;
