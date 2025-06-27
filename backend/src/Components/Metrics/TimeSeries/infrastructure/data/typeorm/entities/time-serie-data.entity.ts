import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { TimeSerieEntity } from './time-serie.entity';
import { DataValuePrimitives } from '@Metrics/TimeSeries/domain';

@Entity('metrics_time_serie_data')
export class TimeSerieData {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ type: 'numeric' })
  value: number;
  @Column({ type: 'timestamptz' })
  date: Date;

  @ManyToOne(() => TimeSerieEntity, (serie) => serie.data)
  timeSerie: TimeSerieEntity;

  toPrimitives(): DataValuePrimitives {
    return {
      date: this.date.toISOString(),
      value: this.value
    };
  }
}
