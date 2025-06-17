import { Query } from '@Components/Shared/domain/query';
import { QueryHandler } from '@Components/Shared/domain/query-handler';
import { injectable, multiInject } from 'inversify';
import diIdentifiers from '../di-identifiers';

@injectable('Singleton')
export class QueryHandlersRepository extends Map<
  Query<Response>,
  QueryHandler<Query<Response>, Response>
> {
  constructor(
    @multiInject(diIdentifiers.QUERY_HANDLER)
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
