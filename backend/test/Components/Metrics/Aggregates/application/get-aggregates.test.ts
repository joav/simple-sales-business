import { GetAggregatesQuery, GetAggregatesQueryHandler, AggregatesGetter } from '@Metrics/Aggregates/application';
import { Aggregate, AggregatesRepository } from '@Metrics/Aggregates/domain';
import { configLogger, LOGGER } from '@Metrics/Aggregates/infrastructure';
import { getLogger } from '@Shared/infrastructure';

describe('Get Aggregates', () => {
  it('should handle query and get response', async () => {
    configLogger();
    const logger = getLogger(LOGGER);
    const values = { aggregateId: 'some', aggregateFn: 'RECOUNT', category: 'products' };
    const repo: AggregatesRepository = {
      listAggregates: () => Promise.resolve([Aggregate.fromPrimitives(values)])
    };
    const getter = new AggregatesGetter(repo);
    const handler = new GetAggregatesQueryHandler(getter, logger);
    const query = new GetAggregatesQuery(values.category);

    const result = await handler.handle(query);
    expect(result.aggregates).toBeTruthy();
    expect(result.aggregates.length).toEqual(1);
    expect(result.aggregates[0]).toEqual(values);
  });
});
