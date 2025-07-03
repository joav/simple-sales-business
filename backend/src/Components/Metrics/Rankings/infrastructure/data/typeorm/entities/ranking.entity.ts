import { Ranking } from '@Metrics/Rankings/domain';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  toDomain(): Ranking {
    return Ranking.fromPrimitives({
      rankingSlug: this.rankingSlug,
      rankingValueTitle: this.rankingValueTitle,
      category: this.category
    });
  }
}
