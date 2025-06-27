import { MigrationInterface, QueryRunner } from 'typeorm';

export class TimeSerieData1750886330249 implements MigrationInterface {
  name = 'TimeSerieData1750886330249';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "metrics_time_serie_data" ("id" SERIAL NOT NULL, "value" numeric NOT NULL, "date" TIMESTAMP WITH TIME ZONE NOT NULL, "timeSerieId" integer, CONSTRAINT "PK_800e3dbfeef8f14f058e4721e84" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "metrics_time_serie_data" ADD CONSTRAINT "FK_491e230a4b53f084b378fa58d6e" FOREIGN KEY ("timeSerieId") REFERENCES "metrics_time_series"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "metrics_time_serie_data" DROP CONSTRAINT "FK_491e230a4b53f084b378fa58d6e"`
    );
    await queryRunner.query(`DROP TABLE "metrics_time_serie_data"`);
  }
}
