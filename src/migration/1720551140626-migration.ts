import { MigrationInterface, QueryRunner } from "typeorm";

export class Migration1720551140626 implements MigrationInterface {
    name = 'Migration1720551140626'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cryptocurrency" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "assetId" character varying NOT NULL, CONSTRAINT "PK_8d1a4026dac40b9af2cf3ef72b4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user_cryptocurrencies_cryptocurrency" ("userId" integer NOT NULL, "cryptocurrencyId" integer NOT NULL, CONSTRAINT "PK_289721e4437431bd72518f22f9e" PRIMARY KEY ("userId", "cryptocurrencyId"))`);
        await queryRunner.query(`CREATE INDEX "IDX_6a87c311c45e6226627460ba58" ON "user_cryptocurrencies_cryptocurrency" ("userId") `);
        await queryRunner.query(`CREATE INDEX "IDX_3fbb80724b19867eff68df57f6" ON "user_cryptocurrencies_cryptocurrency" ("cryptocurrencyId") `);
        await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "list"`);
        await queryRunner.query(`ALTER TABLE "user_cryptocurrencies_cryptocurrency" ADD CONSTRAINT "FK_6a87c311c45e6226627460ba58c" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "user_cryptocurrencies_cryptocurrency" ADD CONSTRAINT "FK_3fbb80724b19867eff68df57f66" FOREIGN KEY ("cryptocurrencyId") REFERENCES "cryptocurrency"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_cryptocurrencies_cryptocurrency" DROP CONSTRAINT "FK_3fbb80724b19867eff68df57f66"`);
        await queryRunner.query(`ALTER TABLE "user_cryptocurrencies_cryptocurrency" DROP CONSTRAINT "FK_6a87c311c45e6226627460ba58c"`);
        await queryRunner.query(`ALTER TABLE "user" ADD "list" character varying`);
        await queryRunner.query(`DROP INDEX "public"."IDX_3fbb80724b19867eff68df57f6"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_6a87c311c45e6226627460ba58"`);
        await queryRunner.query(`DROP TABLE "user_cryptocurrencies_cryptocurrency"`);
        await queryRunner.query(`DROP TABLE "cryptocurrency"`);
    }

}
