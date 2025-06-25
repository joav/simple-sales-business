import { MigrationInterface, QueryRunner } from 'typeorm';

export class TimeSerie1750860220825 implements MigrationInterface {
  name = 'TimeSerie1750860220825';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "metrics_time_series" ("id" SERIAL NOT NULL, "timeSerieSlug" character varying(100) NOT NULL, "category" "public"."metrics_category_enum" NOT NULL, CONSTRAINT "PK_6b005a3205eb2c94764dfcd501b" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `INSERT INTO metrics_time_series VALUES (DEFAULT, 'monthly-sales', 'sales'), (DEFAULT, 'monthly-balance', 'transactions')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "metrics_time_series"`);
  }
}
