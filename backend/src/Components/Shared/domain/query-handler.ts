import { Query } from './query';
import { Response } from './response';

export interface QueryHandler<Q extends Query, R extends Response> {
  handle(query: Q): R;
}
