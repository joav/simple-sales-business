import { AggregateValuesRepository } from '@Metrics/Aggregates/domain';
import { Category } from '@Metrics/Shared/domain';

export class AggregateValueGetter {
  constructor(private repository: AggregateValuesRepository) {}
  run(category: Category, aggregateId: string) {
    return this.repository.get(category, aggregateId);
  }
}
