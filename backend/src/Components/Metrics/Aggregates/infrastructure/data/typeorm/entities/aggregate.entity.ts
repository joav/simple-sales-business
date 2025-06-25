import { Entity, Column } from 'typeorm';
import { Aggregate, AggregateValue, AggregateFn } from '@Metrics/Aggregates/domain';
import { categoryColumnOptions } from '@Metrics/Shared/infrastructure';

@Entity('metrics_aggregates')
export class AggregateEntity {
  @Column({ primary: true, type: 'varchar', length: 100 })
  aggregateId: string;
  @Column(categoryColumnOptions)
  category: string;
  @Column({ type: 'enum', enum: AggregateFn })
  aggregateFn: string;
  @Column({ type: 'numeric', default: 0 })
  aggregateValue = 0;
  @Column({ type: 'timestamptz', nullable: true })
  lastUpdate: Date | null;

  toDomain(): Aggregate {
    return Aggregate.fromPrimitives({
      aggregateId: this.aggregateId,
      category: this.category,
      aggregateFn: this.aggregateFn
    });
  }

  toAggregateValue(): AggregateValue {
    return AggregateValue.fromPrimitives({
      aggregateId: this.aggregateId,
      category: this.category,
      aggregateFn: this.aggregateFn,
      aggregateValue: this.aggregateValue,
      lastUpdate: (this.lastUpdate ?? new Date()).toISOString()
    });
  }
}
