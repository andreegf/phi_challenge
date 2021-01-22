import { getRepository, Repository } from 'typeorm';
import ICreateRentDTO from '../dtos/ICreateRentDTO';
import Rent from '../models/Rent';
import IRentsRepository from './interfaces/IRentsRepository';

class RentsRepository implements IRentsRepository {
    private ormRepository: Repository<Rent>;

    constructor() {
        this.ormRepository = getRepository(Rent);
    }

    public async create(rent_data: ICreateRentDTO): Promise<Rent> {
        const { user_id, movie_id, start_date } = rent_data;
        const rent = await this.ormRepository.create({
            user_id,
            movie_id,
            start_date,
        });

        await this.ormRepository.save(rent);

        return rent;
    }

    public async save(rent: Rent): Promise<Rent> {
        return this.ormRepository.save(rent);
    }

    public async findById(id: string): Promise<Rent | void> {
        const rent = await this.ormRepository.findOne(id);

        return rent;
    }
}

export default RentsRepository;
