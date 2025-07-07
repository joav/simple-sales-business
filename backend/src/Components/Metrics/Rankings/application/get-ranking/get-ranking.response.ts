import { Ranking } from '@Metrics/Rankings/domain';
import { Response } from '@Shared/domain';
import { RankingResponse } from '../ranking.response';
import { RankingCompetitorPrimitives } from '../../domain/ranking-competitor.primitives';

export class GetRankingResponse implements Response {
  public readonly ranking: RankingResponse & { data: RankingCompetitorPrimitives[] };
  constructor(ranking: Ranking) {
    this.ranking = ranking.toPrimitives();
  }
}
