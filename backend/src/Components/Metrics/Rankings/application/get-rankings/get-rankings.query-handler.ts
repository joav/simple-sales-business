import { QueryHandler, ApplicationLogger } from '@Shared/domain';
import { GetRankingsQuery } from './get-rankings.query';
import { GetRankingsResponse } from './get-rankings.response';
import { categoryFromPrimitive } from '@Metrics/Shared/domain';
import { RankingsGetter } from './rankings-getter';

export class GetRankingsQueryHandler
  implements QueryHandler<GetRankingsQuery, GetRankingsResponse>
{
  constructor(
    private readonly getter: RankingsGetter,
    private logger: ApplicationLogger
  ) {}

  subscribedTo() {
    return GetRankingsQuery;
  }

  async handle(query: GetRankingsQuery): Promise<GetRankingsResponse> {
    this.logger.info('Processing GetRankingsQuery...');
    this.logger.debug('Query', { query });
    const category = categoryFromPrimitive(query.category);
    const rankings = await this.getter.run(category);
    this.logger.debug('rankings', { rankings });
    this.logger.info('GetRankingsQuery processed');
    return new GetRankingsResponse(rankings);
  }
}
