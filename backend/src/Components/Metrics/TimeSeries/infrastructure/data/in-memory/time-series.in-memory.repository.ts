import { TimeSerie, TimeSeriesRepository } from '@Metrics/TimeSeries/domain';

export class TimeSeriesInMemoryRepository implements TimeSeriesRepository {
  private timeSeries: TimeSerie[] = [
    TimeSerie.fromPrimitives({
      timeSerieSlug: 'some-time-serie',
      category: 'products'
    })
  ];

  listTimeSeries(): Promise<TimeSerie[]> {
    return Promise.resolve(this.timeSeries);
  }
}
