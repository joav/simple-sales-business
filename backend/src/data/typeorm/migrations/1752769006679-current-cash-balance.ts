import { MigrationInterface, QueryRunner } from 'typeorm';

export class CurrentCashBalance1752769006679 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO metrics_aggregates VALUES ('current-cash-balance', 'transactions', 'SUMMATION')`
    );
  }

  public async down(): Promise<void> {}
}
