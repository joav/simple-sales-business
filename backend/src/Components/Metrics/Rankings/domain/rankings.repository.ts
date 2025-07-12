import { Category } from '@Metrics/Shared/domain';
import { Ranking } from './ranking';

export interface RankingsRepository {
  listRankings(category: Category): Promise<Ranking[]>;
  get(category: Category, rankingSlug: string, top: number): Promise<Ranking>;
}
