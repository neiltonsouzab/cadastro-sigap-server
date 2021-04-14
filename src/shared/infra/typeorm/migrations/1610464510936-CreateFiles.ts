import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateFiles1610464510936 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'files',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'original_name',
            type: 'varchar',
          },
          {
            name: 'content_type',
            type: 'varchar',
          },
          {
            name: 'size',
            type: 'decimal',
            precision: 16,
            scale: 2,
          },
          {
            name: 'from',
            type: 'varchar',
          },
          {
            name: 'ug_registration_id',
            type: 'integer',
            unsigned: true,
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
        foreignKeys: [
          {
            name: 'FileUgRegistration',
            columnNames: ['ug_registration_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'ugs_registrations',
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('files');
  }
}
