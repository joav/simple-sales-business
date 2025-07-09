import { QueryHandler } from '@Shared/domain';
import { AggregateValueGetter } from './aggregate-value-getter';
import { GetAggregateValueResponse } from './get-aggregate-value.response';
import { GetAggregateValueQuery } from './get-aggregate-value.query';
import { categoryFromPrimitive } from '@Metrics/Shared/domain';
import { ApplicationLogger } from '@Shared/domain';

export class GetAggregateValueQueryHandler
  implements QueryHandler<GetAggregateValueQuery, GetAggregateValueResponse>
{
  constructor(
    private getter: AggregateValueGetter,
    private logger: ApplicationLogger
  ) {}
  async handle(query: GetAggregateValueQuery) {
    this.logger.info('Processing GetAggregateValueQuery...');
    this.logger.debug('Query', { query });
    const category = categoryFromPrimitive(query.category);
    const aggregateValue = await this.getter.run(category, query.aggregateId);
    this.logger.debug('aggregateValue', { aggregateValue });
    this.logger.info('GetAggregateValueQuery processed');
    return new GetAggregateValueResponse(aggregateValue);
  }
  subscribedTo() {
    return GetAggregateValueQuery;
  }
}
