import ICreateUserDTO from '../dtos/ICreateUserDTO';
import User from '../models/User';
import IHashProvider from '../providers/models/IHashProvider';
import IUsersRepository from '../repositories/interfaces/IUsersRepository';

class CreateUserService {
    constructor(
        private usersRepository: IUsersRepository,
        private hashProvider: IHashProvider,
    ) {}

    public async execute(user_data: ICreateUserDTO): Promise<User> {
        const { name, email, password } = user_data;

        const userExists = await this.usersRepository.findByEmail(email);

        if (userExists) {
            throw new Error('E-mail already in use');
        }

        const hashedPassword = await this.hashProvider.generateHash(password);

        const createdUser = await this.usersRepository.create({
            name,
            email,
            password: hashedPassword,
        });

        return createdUser;
    }
}

export default CreateUserService;
