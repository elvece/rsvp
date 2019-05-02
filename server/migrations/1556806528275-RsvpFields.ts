import {MigrationInterface, QueryRunner} from "typeorm";

export class RsvpFields1556806528275 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "rsvp" ADD "phone" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rsvp" ADD "notes" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "rsvp" ADD CONSTRAINT "UQ_573a3c26f029387e78e22e86b0c" UNIQUE ("email")`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`ALTER TABLE "rsvp" DROP CONSTRAINT "UQ_573a3c26f029387e78e22e86b0c"`);
        await queryRunner.query(`ALTER TABLE "rsvp" DROP COLUMN "notes"`);
        await queryRunner.query(`ALTER TABLE "rsvp" DROP COLUMN "phone"`);
    }

}
