import { QueryHandler, ApplicationLogger } from '@Shared/domain';
import { categoryFromPrimitive } from '@Metrics/Shared/domain';
import { GetRankingQuery } from './get-ranking.query';
import { GetRankingResponse } from './get-ranking.response';
import { RankingGetter } from './ranking-getter';

export class GetRankingQueryHandler implements QueryHandler<GetRankingQuery, GetRankingResponse> {
  constructor(
    private getter: RankingGetter,
    private logger: ApplicationLogger
  ) {}
  async handle(query: GetRankingQuery) {
    this.logger.info('Processing GetRankingQuery...');
    this.logger.debug('Query', { query });
    const category = categoryFromPrimitive(query.category);
    const ranking = await this.getter.run(category, query.rankingSlug);
    this.logger.debug('ranking', { ranking });
    this.logger.info('GetRankingQuery processed');
    return new GetRankingResponse(ranking);
  }
  subscribedTo() {
    return GetRankingQuery;
  }
}
