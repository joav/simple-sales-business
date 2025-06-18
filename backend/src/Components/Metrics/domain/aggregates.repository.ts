import { Aggregate } from './aggregate';
import { Category } from './category';

export interface AggregatesRepository {
  listAggregates(category: Category): Promise<Aggregate[]>;
}
