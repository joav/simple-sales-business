import { QueryHandler, ApplicationLogger } from '@Shared/domain';
import { GetTimeSeriesQuery } from './get-time-series.query';
import { GetTimeSeriesResponse } from './get-time-series.response';
import { categoryFromPrimitive } from '@Metrics/Shared/domain';
import { TimeSeriesGetter } from './time-series-getter';

export class GetTimeSeriesQueryHandler
  implements QueryHandler<GetTimeSeriesQuery, GetTimeSeriesResponse>
{
  constructor(
    private readonly getter: TimeSeriesGetter,
    private logger: ApplicationLogger
  ) {}

  subscribedTo() {
    return GetTimeSeriesQuery;
  }

  async handle(query: GetTimeSeriesQuery): Promise<GetTimeSeriesResponse> {
    this.logger.info('Processing GetTimeSeriesQuery...');
    this.logger.debug('Query', { query });
    const category = categoryFromPrimitive(query.category);
    const timeSeries = await this.getter.run(category);
    this.logger.debug('timeSeries', { timeSeries });
    this.logger.info('GetTimeSeriesQuery processed');
    return new GetTimeSeriesResponse(timeSeries);
  }
}
