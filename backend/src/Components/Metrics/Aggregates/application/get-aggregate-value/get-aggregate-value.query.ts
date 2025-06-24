import { Query } from '@Shared/domain';
import { GetAggregateValueResponse } from './get-aggregate-value.response';

export class GetAggregateValueQuery implements Query<GetAggregateValueResponse> {
  constructor(
    public readonly category: string,
    public readonly aggregateId: string
  ) {}
}
