import { TimeSerie } from '@Metrics/TimeSeries/domain';
import { Response } from '@Shared/domain';
import { TimeSerieResponse } from '../time-serie.response';
import { DataValuePrimitives } from '../../domain/_data-value.primitives';

export class GetTimeSerieResponse implements Response {
  public readonly timeSerie: (TimeSerieResponse & { data: DataValuePrimitives[] });
  constructor(timeSerie: TimeSerie) {
    this.timeSerie = timeSerie.toPrimitives();
  }
}
