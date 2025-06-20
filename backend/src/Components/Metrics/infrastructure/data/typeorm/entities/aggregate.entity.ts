import { Entity, Column } from 'typeorm';
import { Category } from '@Components/Metrics/domain/category';
import { AggregateFn } from '@Components/Metrics/domain/aggregate-fn';
import { Aggregate } from '@Components/Metrics/domain/aggregate';

@Entity('metrics_aggregates')
export class AggregateEntity {
  @Column({ primary: true, type: 'varchar', length: 100 })
  aggregateId: string;
  @Column({ primary: true, type: 'enum', enum: Category })
  category: string;
  @Column({ type: 'enum', enum: AggregateFn })
  aggregateFn: string;

  toDomain(): Aggregate {
    return Aggregate.fromPrimitives({
      aggregateId: this.aggregateId,
      category: this.category,
      aggregateFn: this.aggregateFn
    });
  }
}
