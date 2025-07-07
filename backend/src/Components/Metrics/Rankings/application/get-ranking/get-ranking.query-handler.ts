import { QueryHandler } from '@Shared/domain';
import { categoryFromPrimitive } from '@Metrics/Shared/domain';
import { GetRankingQuery } from './get-ranking.query';
import { GetRankingResponse } from './get-ranking.response';
import { RankingGetter } from './ranking-getter';

export class GetRankingQueryHandler implements QueryHandler<GetRankingQuery, GetRankingResponse> {
  constructor(private getter: RankingGetter) {}
  async handle(query: GetRankingQuery) {
    const category = categoryFromPrimitive(query.category);
    const ranking = await this.getter.run(category, query.rankingSlug);
    return new GetRankingResponse(ranking);
  }
  subscribedTo() {
    return GetRankingQuery;
  }
}
