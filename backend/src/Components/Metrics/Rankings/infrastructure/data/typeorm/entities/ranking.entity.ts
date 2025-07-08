import { Ranking, RankingBuilder } from '@Metrics/Rankings/domain';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { RankingCompetitorEntity } from './ranking-competitor.entity';

@Entity('metrics_rankings')
export class RankingEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 100 })
  rankingSlug: string;
  @Column({ type: 'varchar', length: 150 })
  rankingValueTitle: string;
  @Column({ type: 'enum', enumName: 'metrics_category_enum' })
  category: string;

  @OneToMany(() => RankingCompetitorEntity, (data) => data.ranking)
  data: RankingCompetitorEntity[];

  toDomain(): Ranking {
    return Ranking.fromPrimitives({
      rankingSlug: this.rankingSlug,
      rankingValueTitle: this.rankingValueTitle,
      category: this.category
    });
  }

  toDomainWithData(): Ranking {
    return new RankingBuilder()
      .withRankingSlug(this.rankingSlug)
      .withRankingValueTitle(this.rankingValueTitle)
      .withCategory(this.category)
      .withData(this.data.map((d) => d.toPrimitives()))
      .build();
  }
}
