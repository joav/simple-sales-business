import { QueryHandler } from '@Shared/domain';
import { categoryFromPrimitive } from '@Metrics/Shared/domain';
import { GetTimeSerieQuery } from './get-time-serie.query';
import { GetTimeSerieResponse } from './get-time-serie.response';
import { TimeSerieGetter } from './time-serie-getter';

export class GetTimeSerieQueryHandler
  implements QueryHandler<GetTimeSerieQuery, GetTimeSerieResponse> {
  constructor(private getter: TimeSerieGetter) { }
  async handle(query: GetTimeSerieQuery) {
    const category = categoryFromPrimitive(query.category);
    const timeSerie = await this.getter.run(category, query.timeSerieSlug);
    return new GetTimeSerieResponse(timeSerie);
  }
  subscribedTo() {
    return GetTimeSerieQuery;
  }
}
