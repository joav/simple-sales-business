import { injectable, multiInject } from 'inversify';
import { sharedDiIdentifiers } from '../di-identifiers';
import { Query, QueryHandler } from '@Shared/domain';

@injectable('Singleton')
export class QueryHandlersRepository extends Map<
  Query<Response>,
  QueryHandler<Query<Response>, Response>
> {
  constructor(
    @multiInject(sharedDiIdentifiers.QUERY_HANDLER)
    queryHandlers: QueryHandler<Query<Response>, Response>[]
  ) {
    super();
    queryHandlers.forEach((queryHandler) => {
      this.set(queryHandler.subscribedTo(), queryHandler);
    });
  }

  public get(query: Query<Response>): QueryHandler<Query<Response>, Response> {
    const queryHandler = super.get(query.constructor);

    return queryHandler;
  }
}
