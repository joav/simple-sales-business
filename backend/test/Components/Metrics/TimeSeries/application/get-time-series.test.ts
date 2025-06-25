import { GetTimeSeriesQuery, GetTimeSeriesQueryHandler, TimeSeriesGetter } from "@Metrics/TimeSeries/application";
import { TimeSerie, TimeSeriesRepository } from "@Metrics/TimeSeries/domain";


describe('Get TimeSeries', () => {
  it('should handle query and get response', async () => {
    const values = { timeSerieSlug: 'some', category: 'products' };
    const repo: TimeSeriesRepository = {
      listTimeSeries: () => Promise.resolve([TimeSerie.fromPrimitives(values)]),
      get: () => Promise.resolve(TimeSerie.fromPrimitives(values))
    };
    const getter = new TimeSeriesGetter(repo);
    const handler = new GetTimeSeriesQueryHandler(getter);
    const query = new GetTimeSeriesQuery(values.category);

    const result = await handler.handle(query);
    expect(result.timeSeries).toBeTruthy();
    expect(result.timeSeries.length).toEqual(1);
    expect(result.timeSeries[0]).toEqual(values);
  });
});
