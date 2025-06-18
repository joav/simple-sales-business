import { Query } from './query';
import { Response } from './response';

export interface QueryHandler<Q extends Query<R>, R extends Response> {
  subscribedTo(): unknown;
  handle(query: Q): Promise<R>;
}
