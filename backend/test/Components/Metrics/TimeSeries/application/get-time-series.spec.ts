import { GetTimeSeriesQuery, GetTimeSeriesQueryHandler, TimeSeriesGetter } from "@Metrics/TimeSeries/application";
import { TimeSerie, TimeSeriesRepository } from "@Metrics/TimeSeries/domain";
import { LOGGER, configLogger } from '@Metrics/TimeSeries/infrastructure';
import { getLogger } from '@Shared/infrastructure';

describe('Get TimeSeries', () => {
  it('should handle query and get response', async () => {
    configLogger();
    const logger = getLogger(LOGGER);
    const values = { timeSerieSlug: 'some', category: 'products' };
    const repo: TimeSeriesRepository = {
      listTimeSeries: () => Promise.resolve([TimeSerie.fromPrimitives(values)]),
      get: () => Promise.resolve(TimeSerie.fromPrimitives(values))
    };
    const getter = new TimeSeriesGetter(repo);
    const handler = new GetTimeSeriesQueryHandler(getter, logger);
    const query = new GetTimeSeriesQuery(values.category);

    const result = await handler.handle(query);
    expect(result.timeSeries).toBeTruthy();
    expect(result.timeSeries.length).toEqual(1);
    expect(result.timeSeries[0]).toEqual(values);
  });
});
