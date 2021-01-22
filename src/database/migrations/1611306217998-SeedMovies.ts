import { query } from 'express';
import { MigrationInterface, QueryRunner } from 'typeorm';
import Movie from '../../models/Movie';

export default class SeedMovies1611306217998 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const movieTable = await queryRunner.manager.getRepository(Movie);
        await movieTable.insert([
            {
                title: 'Crepúsculo',
                director: 'Catherine Hardwicke',
                quantity: 2,
            },
            {
                title: 'Lua Nova',
                director: 'Catherine Hardwicke',
                quantity: 3,
            },
            {
                title: 'Django Livre',
                director: 'Quentin Tarantino',
                quantity: 1,
            },
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const movieTable = await queryRunner.manager.getRepository(Movie);
        await movieTable.delete({
            title: 'Crepúsculo',
        });
        await movieTable.delete({
            title: 'Lua Nova',
        });
        await movieTable.delete({
            title: 'Django Livre',
        });
    }
}
