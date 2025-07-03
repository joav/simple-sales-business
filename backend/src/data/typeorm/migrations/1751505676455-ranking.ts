import { MigrationInterface, QueryRunner } from 'typeorm';

export class Ranking1751505676455 implements MigrationInterface {
  name = 'Ranking1751505676455';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "metrics_rankings" ("id" SERIAL NOT NULL, "rankingSlug" character varying(100) NOT NULL, "rankingValueTitle" character varying(150) NOT NULL, "category" "public"."metrics_category_enum" NOT NULL, CONSTRAINT "PK_b3be72e362d08cc8e0f2c07d880" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `INSERT INTO metrics_rankings VALUES (DEFAULT, 'best-selling-products-all-time', 'Cantidad', 'sales'), (DEFAULT, 'best-selling-products-current-month', 'Cantidad','sales')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "metrics_rankings"`);
  }
}
