import { Query } from '@Shared/domain';
import { GetAggregatesResponse } from './get-aggregates.response';

export class GetAggregatesQuery implements Query<GetAggregatesResponse> {
  constructor(public readonly category: string) {}
}
