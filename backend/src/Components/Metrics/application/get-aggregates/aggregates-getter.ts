import { AggregatesRepository } from '@Metrics/Aggregates/domain';
import { Category } from '@Metrics/Shared/domain';

export class AggregatesGetter {
  constructor(private repository: AggregatesRepository) {}
  run(category: Category) {
    return this.repository.listAggregates(category);
  }
}
