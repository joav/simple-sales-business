import { TimeSerie } from '@Metrics/TimeSeries/domain';
import { Response } from '@Shared/domain';
import { TimeSerieResponse } from '../time-serie.response';

export class GetTimeSeriesResponse implements Response {
  public readonly timeSeries: TimeSerieResponse[];
  constructor(timeSeries: TimeSerie[]) {
    this.timeSeries = timeSeries.map((ts) => ts.toPrimitives());
  }
}
