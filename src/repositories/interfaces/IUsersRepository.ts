import ICreateUserDTO from '../../dtos/ICreateUserDTO';
import User from '../../models/User';

export default interface IUsersRepository {
    findById(id: string): Promise<User | void>;
    findByEmail(email: string): Promise<User | void>;
    create(user_data: ICreateUserDTO): Promise<User>;
}
