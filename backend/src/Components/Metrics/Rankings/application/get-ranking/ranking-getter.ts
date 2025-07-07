import { Category } from '@Metrics/Shared/domain';
import { RankingsRepository } from '@Metrics/Rankings/domain';

export class RankingGetter {
  constructor(private repository: RankingsRepository) {}
  run(category: Category, rankingSlug: string) {
    return this.repository.get(category, rankingSlug);
  }
}
