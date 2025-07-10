import { GetTimeSerieQuery, GetTimeSerieQueryHandler, TimeSerieGetter } from '@Metrics/TimeSeries/application';
import { TimeSerie } from '@Metrics/TimeSeries/domain';
import { LOGGER, configLogger } from '@Metrics/TimeSeries/infrastructure';
import { getLogger } from '@Shared/infrastructure';

describe('Get TimeSerie', () => {
  it('should handle query and get response', async () => {
    configLogger();
    const logger = getLogger(LOGGER);
    const values = { timeSerieSlug: 'some', category: 'products', data: [{ value: 5, date: '2025-06-21T08:09:06.060Z' }] };
    const repo: any = {
      get: () => Promise.resolve(TimeSerie.fromPrimitives(values))
    };
    const getter = new TimeSerieGetter(repo);
    const handler = new GetTimeSerieQueryHandler(getter, logger);
    const query = new GetTimeSerieQuery(values.category, values.timeSerieSlug);

    const result = await handler.handle(query);
    expect(result.timeSerie).toBeTruthy();
    expect(result.timeSerie).toEqual(values);
  });
});
