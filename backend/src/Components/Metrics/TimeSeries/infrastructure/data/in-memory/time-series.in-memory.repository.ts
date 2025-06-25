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

  get() {
    return Promise.resolve(
      TimeSerie.fromPrimitives({
        timeSerieSlug: 'some-time-serie',
        category: 'products',
        data: [
          {
            date: '2025-06-06T02:02:02.060Z',
            value: 5
          }
        ]
      })
    );
  }
}
