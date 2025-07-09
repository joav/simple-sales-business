import { QueryHandler } from '@Shared/domain';
import { AggregatesGetter } from './aggregates-getter';
import { GetAggregatesResponse } from './get-aggregates.response';
import { GetAggregatesQuery } from './get-aggregates.query';
import { categoryFromPrimitive } from '@Metrics/Shared/domain';
import { ApplicationLogger } from '@Shared/domain';

export class GetAggregatesQueryHandler
  implements QueryHandler<GetAggregatesQuery, GetAggregatesResponse>
{
  constructor(
    private getter: AggregatesGetter,
    private logger: ApplicationLogger
  ) {}
  async handle(query: GetAggregatesQuery) {
    this.logger.info('Processing GetAggregatesQuery...');
    this.logger.debug('Query', { query });
    const category = categoryFromPrimitive(query.category);
    const aggregates = await this.getter.run(category);
    this.logger.debug('aggregates', { aggregates });
    this.logger.info('GetAggregatesQuery processed');
    return new GetAggregatesResponse(aggregates);
  }
  subscribedTo() {
    return GetAggregatesQuery;
  }
}
