import { Column, Entity, ManyToOne, PrimaryColumn, JoinColumn } from 'typeorm';
import { RankingEntity } from './ranking.entity';
import { RankingCompetitorPrimitives } from '@Metrics/Rankings/domain';

@Entity('metrics_ranking_competitor')
export class RankingCompetitorEntity {
  @Column({ primary: true, type: 'uuid' })
  id: string;
  @Column({ type: 'varchar', length: 150 })
  name: string;
  @Column({ type: 'numeric' })
  value: number;
  @Column({ type: 'timestamptz' })
  lastUpdate: Date;

  @ManyToOne(() => RankingEntity, (ranking) => ranking.data)
  @JoinColumn({ name: 'rankingId', referencedColumnName: 'id' })
  @PrimaryColumn({ name: 'rankingId', type: 'integer' })
  ranking: RankingEntity;

  toPrimitives(): RankingCompetitorPrimitives {
    return {
      id: this.id,
      name: this.name,
      lastUpdate: this.lastUpdate.toISOString(),
      value: this.value
    };
  }
}
