import { QueryHandler, ApplicationLogger, InvalidInputException } from '@Shared/domain';
import { categoryFromPrimitive } from '@Metrics/Shared/domain';
import { GetRankingQuery } from './get-ranking.query';
import { GetRankingResponse } from './get-ranking.response';
import { RankingGetter } from './ranking-getter';

export const GET_RANKING_EXCEPTIONS = {
  InvalidTop: {
    statusCode: 4100,
    statusMessage: 'Metrics:Application:GetRanking:InvalidTop'
  }
};

export class GetRankingQueryHandler implements QueryHandler<GetRankingQuery, GetRankingResponse> {
  constructor(
    private getter: RankingGetter,
    private logger: ApplicationLogger
  ) {}
  async handle(query: GetRankingQuery) {
    this.logger.info('Processing GetRankingQuery...');
    this.logger.debug('Query', { query });
    const category = categoryFromPrimitive(query.category);
    const top = GetRankingQueryHandler.verifyTop(query.top);
    const ranking = await this.getter.run(category, query.rankingSlug, top);
    this.logger.debug('ranking', { ranking });
    this.logger.info('GetRankingQuery processed');
    return new GetRankingResponse(ranking);
  }
  subscribedTo() {
    return GetRankingQuery;
  }
  private static verifyTop(top: number) {
    if (isNaN(top)) throw InvalidInputException.fromStatusParams(GET_RANKING_EXCEPTIONS.InvalidTop);
    return +top;
  }
}
