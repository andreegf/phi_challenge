import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export default class CreateRents1611291670845 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'rents',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'user_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'movie_id',
                        type: 'uuid',
                        isNullable: false,
                    },
                    {
                        name: 'start_date',
                        type: 'timestamp with time zone',
                        isNullable: false,
                    },
                    {
                        name: 'return_date',
                        type: 'timestamp with time zone',
                        isNullable: true,
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKeys('rents', [
            new TableForeignKey({
                name: 'rentUser',
                columnNames: ['user_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'users',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
            new TableForeignKey({
                name: 'rentMovie',
                columnNames: ['movie_id'],
                referencedColumnNames: ['id'],
                referencedTableName: 'movies',
                onDelete: 'SET NULL',
                onUpdate: 'CASCADE',
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('rents', 'rentMovie');
        await queryRunner.dropForeignKey('rents', 'rentUser');
        await queryRunner.dropTable('rents');
    }
}
