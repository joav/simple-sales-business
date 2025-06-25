import { Category } from '@Metrics/Shared/domain';
import { TimeSeriesRepository } from '@Metrics/TimeSeries/domain';

export class TimeSerieGetter {
  constructor(private repository: TimeSeriesRepository) { }
  run(category: Category, timeSerieSlug: string) {
    return this.repository.get(category, timeSerieSlug);
  }
}
