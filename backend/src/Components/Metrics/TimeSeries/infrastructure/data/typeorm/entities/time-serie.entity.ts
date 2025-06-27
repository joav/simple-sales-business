import { TimeSerie, TimeSerieBuilder } from '@Metrics/TimeSeries/domain';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { TimeSerieData as TimeSerieDataEntity } from './time-serie-data.entity';

@Entity('metrics_time_series')
export class TimeSerieEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'varchar', length: 100 })
  timeSerieSlug: string;
  @Column({ type: 'enum', enumName: 'metrics_category_enum' })
  category: string;

  @OneToMany(() => TimeSerieDataEntity, (data) => data.timeSerie)
  data: TimeSerieDataEntity[];

  toDomain(): TimeSerie {
    return TimeSerie.fromPrimitives({
      timeSerieSlug: this.timeSerieSlug,
      category: this.category
    });
  }

  toDomainWithData(): TimeSerie {
    return new TimeSerieBuilder()
      .withTimeSerieSlug(this.timeSerieSlug)
      .withCategory(this.category)
      .withData(this.data.map((d) => d.toPrimitives()))
      .build();
  }
}
