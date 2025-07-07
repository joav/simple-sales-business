import { GetRankingQuery, GetRankingQueryHandler, RankingGetter } from '@Metrics/Rankings/application';
import { Ranking } from '@Metrics/Rankings/domain';

describe('Get Ranking', () => {
  it('should handle query and get response', async () => {
    const values = { rankingSlug: 'some', rankingValueTitle:'Title', category: 'products', data: [{ name: 'Name', value: 5, lastUpdate: '2025-06-21T08:09:06.060Z' }] };
    const repo: any = {
      get: () => Promise.resolve(Ranking.fromPrimitives(values))
    };
    const getter = new RankingGetter(repo);
    const handler = new GetRankingQueryHandler(getter);
    const query = new GetRankingQuery(values.category, values.rankingSlug);

    const result = await handler.handle(query);
    expect(result.ranking).toBeTruthy();
    expect(result.ranking).toEqual(values);
  });
});
