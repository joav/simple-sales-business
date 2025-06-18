import { Container } from 'inversify';
import { ConfigExecutor } from './config-executor';
import diIdentifiers from './di-identifiers';
import { QueryBusInMemory } from './Query-Bus/query-bus.in-memory';
import { QueryHandlersRepository } from './Query-Bus/query-handlers.repository';

export default {
  config(container: Container) {
    container.bind(diIdentifiers.QUERY_BUS).to(QueryBusInMemory);
    container.bind(QueryHandlersRepository).toSelf();
  }
} satisfies ConfigExecutor;
