import { QueryHandler } from '@Shared/domain';
import { GetRankingsQuery } from './get-rankings.query';
import { GetRankingsResponse } from './get-rankings.response';
import { categoryFromPrimitive } from '@Metrics/Shared/domain';
import { RankingsGetter } from './rankings-getter';

export class GetRankingsQueryHandler
  implements QueryHandler<GetRankingsQuery, GetRankingsResponse>
{
  constructor(private readonly getter: RankingsGetter) {}

  subscribedTo() {
    return GetRankingsQuery;
  }

  async handle(query: GetRankingsQuery): Promise<GetRankingsResponse> {
    const category = categoryFromPrimitive(query.category);
    const rankings = await this.getter.run(category);
    return new GetRankingsResponse(rankings);
  }
}
