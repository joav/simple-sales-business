import { Category } from '@Metrics/Shared/domain';
import { TimeSerie } from './time-serie';

export interface TimeSeriesRepository {
  listTimeSeries(category: Category): Promise<TimeSerie[]>;
}
