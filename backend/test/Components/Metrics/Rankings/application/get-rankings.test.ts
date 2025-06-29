import { GetRankingsQuery, GetRankingsQueryHandler, RankingsGetter } from "@Metrics/Rankings/application";
import { Ranking, RankingsRepository } from "@Metrics/Rankings/domain";


describe('Get Rankings', () => {
  it('should handle query and get response', async () => {
    const values = { rankingSlug: 'some', rankingValueTitle: 'Title Ranking', category: 'products' };
    const repo: RankingsRepository = {
      listRankings: () => Promise.resolve([Ranking.fromPrimitives(values)])
    };
    const getter = new RankingsGetter(repo);
    const handler = new GetRankingsQueryHandler(getter);
    const query = new GetRankingsQuery(values.category);

    const result = await handler.handle(query);
    expect(result.rankings).toBeTruthy();
    expect(result.rankings.length).toEqual(1)
    expect(result.rankings[0]).toEqual(values);
  });
});
