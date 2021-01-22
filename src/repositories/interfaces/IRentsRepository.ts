import ICreateRentDTO from '../../dtos/ICreateRentDTO';
import Rent from '../../models/Rent';

export default interface IRentsRepository {
    findById(id: string): Promise<Rent | void>;
    create(rent_data: ICreateRentDTO): Promise<Rent>;
    save(rent: Rent): Promise<Rent>;
}
