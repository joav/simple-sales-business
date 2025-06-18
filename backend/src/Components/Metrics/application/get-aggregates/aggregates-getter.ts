import { AggregatesRepository } from '@Components/Metrics/domain/aggregates.repository';
import { Category } from '@Components/Metrics/domain/category';

export class AggregatesGetter {
  constructor(private repository: AggregatesRepository) {}
  run(category: Category) {
    return this.repository.listAggregates(category);
  }
}
