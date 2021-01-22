import { uuid } from 'uuidv4';
import IRentsRepository from '../interfaces/IRentsRepository';
import Rent from '../../models/Rent';
import ICreateRentDTO from '../../dtos/ICreateRentDTO';

class FakeRentsRepository implements IRentsRepository {
    private rents: Rent[] = [];

    public async create(rent_data: ICreateRentDTO): Promise<Rent> {
        const rent = new Rent();

        Object.assign(rent, { id: uuid() }, rent_data);

        this.rents.push(rent);

        return rent;
    }

    public async findById(id: string): Promise<Rent | void> {
        const foundRent = await this.rents.find(rent => rent.id === id);

        return foundRent;
    }

    public async save(rent: Rent): Promise<Rent> {
        const foundRent = await this.rents.findIndex(
            rentList => rentList.id === rent.id,
        );

        this.rents[foundRent] = rent;

        return rent;
    }
}

export default FakeRentsRepository;
