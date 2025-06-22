import { Aggregate } from '@Components/Metrics/domain/aggregate';
import { AggregatesRepository } from '@Components/Metrics/domain/aggregates.repository';
import { AggregateValue } from '@Components/Metrics/domain/aggregate-value';
import { AggregateValuesRepository } from '@Components/Metrics/domain/aggregate-values.repository';

export class AggregatesInMemoryRepository implements AggregatesRepository, AggregateValuesRepository {
  private aggregates: Aggregate[] = [
    Aggregate.fromPrimitives({
      aggregateId: 'some-count',
      aggregateFn: 'RECOUNT',
      category: 'products'
    })
  ];
  private aggregateValue = AggregateValue.fromPrimitives({
    aggregateId: 'some-count',
    aggregateFn: 'RECOUNT',
    category: 'products',
    aggregateValue: 5,
    lastUpdate: (new Date).toISOString()
});

  listAggregates(): Promise<Aggregate[]> {
    return Promise.resolve(this.aggregates);
  }

  get(): Promise<AggregateValue> {
    return Promise.resolve(this.aggregateValue);
  }
}
