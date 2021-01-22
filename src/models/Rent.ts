import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import Movie from './Movie';
import User from './User';

@Entity('rents')
class Rent {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    user_id: string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @Column()
    movie_id: string;

    @ManyToOne(() => Movie)
    @JoinColumn({ name: 'movie_id' })
    movie: Movie;

    @Column('timestamp with time zone')
    start_date: Date;

    @Column('timestamp with time zone')
    return_date: Date;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}

export default Rent;
