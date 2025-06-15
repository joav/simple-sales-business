import { AggregatesRepository } from '@Components/Metrics/domain/aggregates.repository';

export class AggregatesGetter {
  constructor(private repository: AggregatesRepository) {}
  run() {
    return this.repository.listAggregates();
  }
}
