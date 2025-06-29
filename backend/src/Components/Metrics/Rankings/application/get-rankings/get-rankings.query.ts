import { Query } from '@Shared/domain';
import { GetRankingsResponse } from './get-rankings.response';

export class GetRankingsQuery implements Query<GetRankingsResponse> {
  constructor(public readonly category: string) {}
}
