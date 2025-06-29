import { Category } from '@Metrics/Shared/domain';
import { RankingsRepository } from '../../domain/rankings.repository';

export class RankingsGetter {
  constructor(private readonly rankingsRepository: RankingsRepository) {}
  run(category: Category) {
    return this.rankingsRepository.listRankings(category);
  }
}
