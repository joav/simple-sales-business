import { Aggregate } from '@Components/Metrics/domain/aggregate';
import { AggregatesRepository } from '@Components/Metrics/domain/aggregates.repository';

export class AggregatesInMemoryRepository implements AggregatesRepository {
  private aggregates: Aggregate[] = [
    Aggregate.fromPrimitives({
      aggregateId: 'some-count',
      aggregateFn: 'RECOUNT',
      category: 'products'
    })
  ];

  listAggregates(): Promise<Aggregate[]> {
    return Promise.resolve(this.aggregates);
  }
}
