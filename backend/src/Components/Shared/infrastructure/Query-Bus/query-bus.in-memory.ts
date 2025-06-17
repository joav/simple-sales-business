import { Query } from '@Components/Shared/domain/query';
import { QueryBus } from '@Components/Shared/domain/query-bus';
import { Response } from '@Components/Shared/domain/response';
import { QueryHandlersRepository } from './query-handlers.repository';
import { inject, injectable } from 'inversify';

@injectable('Singleton')
export class QueryBusInMemory implements QueryBus {
  constructor(
    @inject(QueryHandlersRepository) private queryHandlersRepository: QueryHandlersRepository
  ) {}

  async ask<R extends Response>(query: Query<R>): Promise<R> {
    const handler = this.queryHandlersRepository.get(query);

    return (await handler.handle(query)) as unknown as Promise<R>;
  }
}
