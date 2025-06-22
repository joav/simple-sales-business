import { AggregateValue } from './aggregate-value';
import { Category } from './category';

export interface AggregateValuesRepository {
  get(category: Category, aggregateId: string): Promise<AggregateValue>;
}
