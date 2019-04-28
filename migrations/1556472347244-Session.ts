import {MigrationInterface, QueryRunner} from "typeorm";

export class Session1556472347244 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`CREATE TABLE "session" ("sid" text NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "expire" TIMESTAMP NOT NULL, "sess" json NOT NULL, CONSTRAINT "PK_7575923e18b495ed2307ae629ae" PRIMARY KEY ("sid"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query(`DROP TABLE "session"`);
    }

}
