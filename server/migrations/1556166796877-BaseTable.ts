import {MigrationInterface, QueryRunner} from "typeorm";

export class BaseTable1556166796877 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "rsvps" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "first_name" text NOT NULL, "last_name" text NOT NULL, "email" text NOT NULL, "reply" boolean NOT NULL, CONSTRAINT "PK_33487519e664b4559d391ab71fb" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "rsvp"`);
    }

}
