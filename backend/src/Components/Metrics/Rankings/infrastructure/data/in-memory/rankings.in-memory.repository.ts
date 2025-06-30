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
}
