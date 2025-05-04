import { MigrationInterface, QueryRunner } from "typeorm";

export class RemovedUserPhone1746380530544 implements MigrationInterface {
    name = 'RemovedUserPhone1746380530544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "phone"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "phone" character varying NOT NULL`);
    }

}
