import { AggregateValuesRepository } from '@Components/Metrics/domain/aggregate-values.repository';
import { Category } from '@Components/Metrics/domain/category';

export class AggregateValueGetter {
  constructor(private repository: AggregateValuesRepository) {}
  run(category: Category, aggregateId: string) {
    return this.repository.get(category, aggregateId);
  }
}