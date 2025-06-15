import { Query } from './query';
import { Response } from './response';

export interface QueryHandler {
  handle(query: Query): Response;
}