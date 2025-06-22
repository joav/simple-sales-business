import { QueryHandler } from '@Components/Shared/domain/query-handler';
import { AggregateValueGetter } from './aggregate-value-getter';
import { GetAggregateValueResponse } from './get-aggregate-value.response';
import { GetAggregateValueQuery } from './get-aggregate-value.query';
import { categoryFromPrimitive } from '@Components/Metrics/domain/category-from-primitive';

export class GetAggregateValueQueryHandler
  implements QueryHandler<GetAggregateValueQuery, GetAggregateValueResponse>
{
  constructor(private getter: AggregateValueGetter) {}
  async handle(query: GetAggregateValueQuery) {
    const category = categoryFromPrimitive(query.category);
    const aggregateValue = await this.getter.run(category, query.aggregateId);
    return new GetAggregateValueResponse(aggregateValue);
  }
  subscribedTo() {
    return GetAggregateValueQuery;
  }
}
