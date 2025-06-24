import { Query } from '@Components/Shared/domain/query';
import { GetAggregateValueResponse } from './get-aggregate-value.response';

export class GetAggregateValueQuery implements Query<GetAggregateValueResponse> {
  constructor(
    public readonly category: string,
    public readonly aggregateId: string
  ) {}
}
