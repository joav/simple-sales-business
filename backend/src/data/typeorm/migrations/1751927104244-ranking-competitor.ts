import { MigrationInterface, QueryRunner } from 'typeorm';

export class RankingCompetitor1751927104244 implements MigrationInterface {
  name = 'RankingCompetitor1751927104244';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "metrics_ranking_competitor" ("id" uuid NOT NULL, "name" character varying(150) NOT NULL, "value" numeric NOT NULL, "lastUpdate" TIMESTAMP WITH TIME ZONE NOT NULL, "rankingId" integer NOT NULL, CONSTRAINT "PK_97025ab643214a2c4c6a816d1ab" PRIMARY KEY ("id", "rankingId"))`
    );
    await queryRunner.query(
      `ALTER TABLE "metrics_ranking_competitor" ADD CONSTRAINT "FK_0ecebbad814a8cd018645544afa" FOREIGN KEY ("rankingId") REFERENCES "metrics_rankings"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
    await queryRunner.query('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP EXTENSION "uuid-ossp"');
    await queryRunner.query(
      `ALTER TABLE "metrics_ranking_competitor" DROP CONSTRAINT "FK_0ecebbad814a8cd018645544afa"`
    );
    await queryRunner.query(`DROP TABLE "metrics_ranking_competitor"`);
  }
}
