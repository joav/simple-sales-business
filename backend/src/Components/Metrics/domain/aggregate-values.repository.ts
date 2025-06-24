import { AggregateValue } from './aggregate-value';
import { Category } from '@Metrics/Shared/domain';

export interface AggregateValuesRepository {
  get(category: Category, aggregateId: string): Promise<AggregateValue>;
}
