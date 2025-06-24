import { QueryHandler } from '@Components/Shared/domain/query-handler';
import { AggregatesGetter } from './aggregates-getter';
import { GetAggregatesResponse } from './get-aggregates.response';
import { GetAggregatesQuery } from './get-aggregates.query';
import { categoryFromPrimitive } from '@Metrics/Shared/domain';

export class GetAggregatesQueryHandler
  implements QueryHandler<GetAggregatesQuery, GetAggregatesResponse>
{
  constructor(private getter: AggregatesGetter) {}
  async handle(query: GetAggregatesQuery) {
    const category = categoryFromPrimitive(query.category);
    const aggregates = await this.getter.run(category);
    return new GetAggregatesResponse(aggregates);
  }
  subscribedTo() {
    return GetAggregatesQuery;
  }
}
