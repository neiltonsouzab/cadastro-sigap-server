import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUgsRegistrations1610462890755
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'ugs_registrations',
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
            name: 'code',
            type: 'varchar',
          },
          {
            name: 'cnpj',
            type: 'varchar',
          },
          {
            name: 'name',
            type: 'varchar',
          },
          {
            name: 'fantasy_name',
            type: 'varchar',
          },
          {
            name: 'address',
            type: 'varchar',
          },
          {
            name: 'number',
            type: 'varchar',
          },
          {
            name: 'district',
            type: 'varchar',
          },
          {
            name: 'cep',
            type: 'varchar',
          },
          {
            name: 'complement',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'email',
            type: 'varchar',
          },
          {
            name: 'phone',
            type: 'varchar',
          },
          {
            name: 'site',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'short_name',
            type: 'varchar',
          },
          {
            name: 'open_date',
            type: 'datetime',
          },
          {
            name: 'legal_nature_code',
            type: 'varchar',
          },
          {
            name: 'obs',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'expense_ordinator_cpf',
            type: 'varchar',
          },
          {
            name: 'expense_ordinator_name',
            type: 'varchar',
          },
          {
            name: 'expense_ordinator_email',
            type: 'varchar',
          },
          {
            name: 'status',
            type: 'varchar',
            default: "'ANALISE'",
          },
          {
            name: 'status_justification',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'user_id',
            type: 'integer',
            unsigned: true,
            isNullable: true,
          },
          {
            name: 'user_update_id',
            type: 'integer',
            unsigned: true,
            isNullable: true,
          },
          {
            name: 'ug_id',
            type: 'integer',
            unsigned: true,
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
        foreignKeys: [
          {
            name: 'UgRegistrationUser',
            columnNames: ['user_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'UgRegistrationUserUpdate',
            columnNames: ['user_update_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'users',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
          {
            name: 'UgRegistrationUg',
            columnNames: ['ug_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'ugs',
            onDelete: 'SET NULL',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('ugs_registrations');
  }
}
