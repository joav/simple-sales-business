import { Entity, Column } from "typeorm";
import { Category } from '@Components/Metrics/domain/category';
import { AggregateFn } from '@Components/Metrics/domain/aggregate-fn';

@Entity('metrics_aggregates')
export class AggregateEntity {
  @Column({primary: true, type: 'varchar', length: 100})
  aggregateId: string;
  @Column({primary: true, type: 'enum', enum: Category})
  category: string;
  @Column({type: 'enum', enum: AggregateFn})
  aggregateFn: string;
}