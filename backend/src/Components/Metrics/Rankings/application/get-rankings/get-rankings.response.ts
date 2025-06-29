import { Ranking } from '@Metrics/Rankings/domain';
import { Response } from '@Shared/domain';
import { RankingResponse } from '../ranking.response';

export class GetRankingsResponse implements Response {
  public readonly rankings: RankingResponse[];
  constructor(rankings: Ranking[]) {
    this.rankings = rankings.map((rk) => rk.toPrimitives());
  }
}
