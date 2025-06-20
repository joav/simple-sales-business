import { MigrationInterface, QueryRunner } from 'typeorm';

export class Initial1750438981704 implements MigrationInterface {
  name = 'Initial1750438981704';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."metrics_aggregates_category_enum" AS ENUM('products', 'sales', 'transactions')`
    );
    await queryRunner.query(
      `CREATE TYPE "public"."metrics_aggregates_aggregatefn_enum" AS ENUM('SUMMATION', 'RECOUNT')`
    );
    await queryRunner.query(
      `CREATE TABLE "metrics_aggregates" ("aggregateId" character varying(100) NOT NULL, "category" "public"."metrics_aggregates_category_enum" NOT NULL, "aggregateFn" "public"."metrics_aggregates_aggregatefn_enum" NOT NULL, CONSTRAINT "PK_333728a567c2a4b6a2167282de6" PRIMARY KEY ("aggregateId", "category"))`
    );
    await queryRunner.query(
      `INSERT INTO metrics_aggregates VALUES ('with-stock', 'products', 'RECOUNT'), ('without-stock', 'products', 'RECOUNT'), ('current-month', 'sales','SUMMATION'), ('current-month-earnings', 'sales', 'SUMMATION'), ('current-balance', 'transactions', 'SUMMATION')`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "metrics_aggregates"`);
    await queryRunner.query(`DROP TYPE "public"."metrics_aggregates_aggregatefn_enum"`);
    await queryRunner.query(`DROP TYPE "public"."metrics_aggregates_category_enum"`);
  }
}
