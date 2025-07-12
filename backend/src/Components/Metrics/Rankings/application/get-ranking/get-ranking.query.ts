import { Query } from '@Shared/domain';
import { GetRankingResponse } from './get-ranking.response';

export class GetRankingQuery implements Query<GetRankingResponse> {
  constructor(
    public readonly category: string,
    public readonly rankingSlug: string,
    public readonly top: number
  ) {}
}
