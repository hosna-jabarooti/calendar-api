import { MigrationInterface, QueryRunner } from "typeorm";

export class StartDateTimeRename1790613841538 implements MigrationInterface {
    name = 'StartDateTimeRename1790613841538'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" RENAME COLUMN "startDatetime" TO "startDateTime"`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "event" RENAME COLUMN "startDateTime" TO "startDatetime"`);
    }

}
