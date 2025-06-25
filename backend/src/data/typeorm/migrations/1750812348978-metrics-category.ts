import { MigrationInterface, QueryRunner } from 'typeorm';

export class MetricsCategory1750812348978 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."metrics_category_enum" AS ENUM('products', 'sales', 'transactions')`
    );
    await queryRunner.query(
      `ALTER TABLE "metrics_aggregates" ALTER COLUMN "category" TYPE varchar(20)`
    );
    await queryRunner.query(
      `ALTER TABLE "metrics_aggregates" ALTER COLUMN "category" TYPE "public"."metrics_category_enum" using "category"::"public"."metrics_category_enum"`
    );
    await queryRunner.query(`DROP TYPE "public"."metrics_aggregates_category_enum"`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "public"."metrics_aggregates_category_enum" AS ENUM('products', 'sales', 'transactions')`
    );
    await queryRunner.query(
      `ALTER TABLE "metrics_aggregates" ALTER COLUMN "category" TYPE varchar(20)`
    );
    await queryRunner.query(
      `ALTER TABLE "metrics_aggregates" ALTER COLUMN "category" TYPE "public"."metrics_category_enum" using "category"::"public"."metrics_aggregates_category_enum"`
    );
    await queryRunner.query(`DROP TYPE "public"."metrics_category_enum"`);
  }
}
