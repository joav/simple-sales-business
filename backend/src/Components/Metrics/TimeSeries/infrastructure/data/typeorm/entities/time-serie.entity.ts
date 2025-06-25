import { TimeSerie } from '@Metrics/TimeSeries/domain';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('metrics_time_series')
export class TimeSerieEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 100 })
  timeSerieSlug: string;
  @Column({ type: 'enum', enumName: 'metrics_category_enum' })
  category: string;

  toDomain(): TimeSerie {
    return TimeSerie.fromPrimitives({
      timeSerieSlug: this.timeSerieSlug,
      category: this.category
    });
  }
}
