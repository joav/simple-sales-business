import { GetAggregateValueQuery, GetAggregateValueQueryHandler, AggregateValueGetter } from '@Metrics/Aggregates/application';
import { AggregateValuesRepository, AggregateValue } from '@Metrics/Aggregates/domain';
import { configLogger, LOGGER } from '@Metrics/Aggregates/infrastructure';
import { getLogger } from '@Shared/infrastructure';

describe('Get AggregateValue', () => {
  it('should handle query and get response', async () => {
    configLogger();
    const logger = getLogger(LOGGER);
    const values = { aggregateId: 'some', aggregateFn: 'RECOUNT', category: 'products', aggregateValue: 5, lastUpdate: '2025-06-21T08:09:06.060Z' };
    const repo: AggregateValuesRepository = {
      get: () => Promise.resolve(AggregateValue.fromPrimitives(values))
    };
    const getter = new AggregateValueGetter(repo);
    const handler = new GetAggregateValueQueryHandler(getter, logger);
    const query = new GetAggregateValueQuery(values.category, values.aggregateId);

    const result = await handler.handle(query);
    expect(result.aggregateValue).toBeTruthy();
    expect(result.aggregateValue).toEqual(values);
  });
});
