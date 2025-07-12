import { Category } from '@Metrics/Shared/domain';
import { TimeSeriesRepository } from '@Metrics/TimeSeries/domain';

export class TimeSerieGetter {
  constructor(private repository: TimeSeriesRepository) {}
  run(category: Category, timeSerieSlug: string, from: Date, to: Date) {
    return this.repository.get(category, timeSerieSlug, from, to);
  }
}
