import { uuid } from 'uuidv4';
import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../models/User';
import IUsersRepository from '../interfaces/IUsersRepository';

class FakeUsersRepository implements IUsersRepository {
    private users: User[] = [];

    public async create(user_data: ICreateUserDTO): Promise<User> {
        const user = new User();

        Object.assign(user, { id: uuid() }, user_data);

        this.users.push(user);

        return user;
    }

    public async findById(id: string): Promise<User | void> {
        const foundUser = await this.users.find(user => user.id === id);

        return foundUser;
    }

    public async findByEmail(email: string): Promise<User | void> {
        const foundUser = await this.users.find(user => user.email === email);

        return foundUser;
    }
}

export default FakeUsersRepository;
