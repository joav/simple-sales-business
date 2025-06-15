import { Aggregate } from './aggregate';

export interface AggregatesRepository {
  listAggregates(): Promise<Aggregate[]>;
}
