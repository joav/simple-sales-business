import { QueryHandler, ApplicationLogger } from '@Shared/domain';
import { categoryFromPrimitive } from '@Metrics/Shared/domain';
import { GetTimeSerieQuery } from './get-time-serie.query';
import { GetTimeSerieResponse } from './get-time-serie.response';
import { TimeSerieGetter } from './time-serie-getter';

export class GetTimeSerieQueryHandler
  implements QueryHandler<GetTimeSerieQuery, GetTimeSerieResponse>
{
  constructor(
    private getter: TimeSerieGetter,
    private logger: ApplicationLogger
  ) {}
  async handle(query: GetTimeSerieQuery) {
    this.logger.info('Processing GetTimeSerieQuery...');
    this.logger.debug('Query', { query });
    const category = categoryFromPrimitive(query.category);
    const timeSerie = await this.getter.run(category, query.timeSerieSlug);
    this.logger.debug('timeSerie', { timeSerie });
    this.logger.info('GetTimeSerieQuery processed');
    return new GetTimeSerieResponse(timeSerie);
  }
  subscribedTo() {
    return GetTimeSerieQuery;
  }
}
