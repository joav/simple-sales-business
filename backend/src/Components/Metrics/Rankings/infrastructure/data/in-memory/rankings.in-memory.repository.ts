import { Ranking, RankingsRepository } from '@Metrics/Rankings/domain';

export class RankingsInMemoryRepository implements RankingsRepository {
  private rankings: Ranking[] = [
    Ranking.fromPrimitives({
      rankingSlug: 'some-ranking',
      rankingValueTitle: 'Ranking value title',
      category: 'products'
    })
  ];

  listRankings(): Promise<Ranking[]> {
    return Promise.resolve(this.rankings);
  }

  get() {
    return Promise.resolve(
      Ranking.fromPrimitives({
        rankingSlug: 'some-ranking',
        rankingValueTitle: 'Title',
        category: 'products',
        data: [
          {
            name: 'Name',
            lastUpdate: '2025-06-06T02:02:02.060Z',
            value: 5
          }
        ]
      })
    );
  }
}
