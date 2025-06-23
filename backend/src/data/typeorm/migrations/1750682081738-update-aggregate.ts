import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateAggregate1750682081738 implements MigrationInterface {
  name = 'UpdateAggregate1750682081738';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "metrics_aggregates" ADD "aggregateValue" numeric NOT NULL DEFAULT '0'`
    );
    await queryRunner.query(
      `ALTER TABLE "metrics_aggregates" ADD "lastUpdate" TIMESTAMP WITH TIME ZONE`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "metrics_aggregates" DROP COLUMN "lastUpdate"`);
    await queryRunner.query(`ALTER TABLE "metrics_aggregates" DROP COLUMN "aggregateValue"`);
  }
}
