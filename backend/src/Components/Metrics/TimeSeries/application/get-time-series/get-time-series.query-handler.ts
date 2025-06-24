import { QueryHandler } from '@Shared/domain';
import { GetTimeSeriesQuery } from './get-time-series.query';
import { GetTimeSeriesResponse } from './get-time-series.response';
import { categoryFromPrimitive } from '@Metrics/Shared/domain';
import { TimeSeriesGetter } from './time-series-getter';

export class GetTimeSeriesQueryHandler
  implements QueryHandler<GetTimeSeriesQuery, GetTimeSeriesResponse>
{
  constructor(private readonly getter: TimeSeriesGetter) {}

  subscribedTo() {
    return GetTimeSeriesQuery;
  }

  async handle(query: GetTimeSeriesQuery): Promise<GetTimeSeriesResponse> {
    const category = categoryFromPrimitive(query.category);
    const timeSeries = await this.getter.run(category);
    return new GetTimeSeriesResponse(timeSeries);
  }
}
