import { sign } from 'jsonwebtoken';
import authConfig from '../config/AuthConfig';
import AppError from '../helpers/AppError';
import User from '../models/User';
import IHashProvider from '../providers/models/IHashProvider';
import IUsersRepository from '../repositories/interfaces/IUsersRepository';

interface IRequest {
    password: string;
    email: string;
}

interface IResponse {
    user: User;
    token: string;
}

class AuthenticateUserService {
    constructor(
        private usersRepository: IUsersRepository,
        private hashProvider: IHashProvider,
    ) {}

    public async execute({ email, password }: IRequest): Promise<IResponse> {
        const userExists = await this.usersRepository.findByEmail(email);

        if (!userExists) {
            throw new AppError('Invalid email/password');
        }

        const passwordMatches = await this.hashProvider.compareHash(
            password,
            userExists.password,
        );

        if (!passwordMatches) {
            throw new AppError('invalid email/password');
        }

        const { secret, expiresIn } = authConfig.jwt;

        const token = sign({}, secret, {
            subject: userExists.id,
            expiresIn,
        });

        return {
            user: userExists,
            token,
        };
    }
}

export default AuthenticateUserService;
