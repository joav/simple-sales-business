import { AggregateValue } from './aggregate-value';
import { Categoría } from './category';

export interface AggregateValuesRepository {
  get(category: Category, aggregateId: string): Promise<AggregateValue>;
}
