import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUser1720378483399 implements MigrationInterface {
    name = 'CreateUser1720378483399'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "list" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user" ALTER COLUMN "list" SET NOT NULL`);
    }

}
