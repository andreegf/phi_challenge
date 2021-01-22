import { getRepository, Repository } from 'typeorm';
import User from '../models/User';
import IUsersRepository from './interfaces/IUsersRepository';
import ICreateUserDTO from '../dtos/ICreateUserDTO';

class UsersRepository implements IUsersRepository {
    private ormRepository: Repository<User>;

    constructor() {
        this.ormRepository = getRepository(User);
    }

    public async create(user_data: ICreateUserDTO): Promise<User> {
        const user = this.ormRepository.create(user_data);

        await this.ormRepository.save(user);

        return user;
    }

    public async findById(id: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne(id);

        return user;
    }

    public async findByEmail(email: string): Promise<User | undefined> {
        const user = await this.ormRepository.findOne({
            where: { email },
        });

        return user;
    }
}

export default UsersRepository;
