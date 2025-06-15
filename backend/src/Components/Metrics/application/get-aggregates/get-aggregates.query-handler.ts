import { QueryHandler } '@Components/Shared/domain/query-handler';
import { AggregatesGetter } from './aggregates-getter';
import { GetAggregatesResponse } from './get-aggregates.response';
import { GetAggregatesQuery } from './get-aggregates.query';

export class GetAggregatesQueryHandler implements QueryHandler<GetAggregatesQuery, GetAggregatesResponse> {
  constructor(private getter: AggregatesGetter) {}
  async handle(_query: GetAggregatesQuery) {
    const aggregates = await this.getter.run();
    return new GetAggregatesResponse(aggregates);
}
  subscribedTo() {
    return GetAggregatesQuery;
  }
}
