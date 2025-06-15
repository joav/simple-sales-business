import { GetAggregatesQuery } from '@Components/Metrics/application/get-aggregates/get-aggregates.query';
import { GetAggregatesQueryHandler } from '@Components/Metrics/application/get-aggregates/get-aggregates.query-handler';
import { AggregatesGetter } from '@Components/Metrics/application/get-aggregates/aggregates-getter';
import { AggregatesRepository } from '@Components/Metrics/domain/aggregates.repository';
import { Aggregate } from '@Components/Metrics/domain/aggregate';

describe('Get Aggregates', () => {
  it('should handle query and get response', async () => {
const values = {aggregateId: 'some', aggregateFn: 'RECOUNT', category: 'products'};
    const repo: AggregatesRepository = {
      listAggregates: () => Promise.resolve([Aggregate.fromPrimitives(values)])
    };
    const getter = new AggregatesGetter(repo);
    const handler = new GetAggregatesQueryHandler(getter);
    const query = new GetAggregatesQuery();

    const result = await handler.handle(query);
    expect(result.aggregates).toBeTruthy();
    expect(result.aggregates.length).toEqual(1);
    expect(result.aggregates[0]).toEqual(values);
  });
});