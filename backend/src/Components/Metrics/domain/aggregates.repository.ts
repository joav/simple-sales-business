import { Aggregate } from './aggregate';
import { Category } from '@Metrics/Shared/domain';

export interface AggregatesRepository {
  listAggregates(category: Category): Promise<Aggregate[]>;
}
