import {
  Aggregate,
  AggregatesRepository,
  AggregateValue,
  AggregateValuesRepository
} from '@Metrics/Aggregates/domain';

export class AggregatesInMemoryRepository
  implements AggregatesRepository, AggregateValuesRepository
{
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
    lastUpdate: '2025-06-21T08:08:08.060Z'
  });

  listAggregates(): Promise<Aggregate[]> {
    return Promise.resolve(this.aggregates);
  }

  get(): Promise<AggregateValue> {
    return Promise.resolve(this.aggregateValue);
  }
}
