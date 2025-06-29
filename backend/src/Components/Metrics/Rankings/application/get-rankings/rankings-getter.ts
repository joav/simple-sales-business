import { Category } from '@Metrics/Shared/domain';
import { TimeSeriesRepository } from '../../domain/time-series.repository';

export class TimeSeriesGetter {
  constructor(private readonly timeSeriesRepository: TimeSeriesRepository) {}
  run(category: Category) {
    return this.timeSeriesRepository.listTimeSeries(category);
  }
}
