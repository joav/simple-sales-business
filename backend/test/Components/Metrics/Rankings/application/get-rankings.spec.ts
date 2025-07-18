import { GetRankingsQuery, GetRankingsQueryHandler, RankingsGetter } from "@Metrics/Rankings/application";
import { Ranking, RankingsRepository } from "@Metrics/Rankings/domain";
import { getLogger } from '@Shared/infrastructure';
import { LOGGER, configLogger } from '@Metrics/Rankings/infrastructure';


describe('Get Rankings', () => {
  it('should handle query and get response', async () => {
    configLogger();
    const logger = getLogger(LOGGER);
    const values = { rankingSlug: 'some', rankingValueTitle: 'Title Ranking', category: 'products' };
    const repo: RankingsRepository = {
      listRankings: () => Promise.resolve([Ranking.fromPrimitives(values)]),
      get: () => Promise.resolve(Ranking.fromPrimitives(values))
    };
    const getter = new RankingsGetter(repo);
    const handler = new GetRankingsQueryHandler(getter, logger);
    const query = new GetRankingsQuery(values.category);

    const result = await handler.handle(query);
    expect(result.rankings).toBeTruthy();
    expect(result.rankings.length).toEqual(1)
    expect(result.rankings[0]).toEqual(values);
  });
});
