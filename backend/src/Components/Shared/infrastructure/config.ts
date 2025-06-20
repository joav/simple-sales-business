import { Container } from 'inversify';
import { ConfigExecutor } from './config-executor';
import diIdentifiers from './di-identifiers';
import { QueryBusInMemory } from './Query-Bus/query-bus.in-memory';
import { QueryHandlersRepository } from './Query-Bus/query-handlers.repository';
import dataSourceConfig, { DataSourceConfig } from './data/typeorm/data-source.config';
import { DataSourceWrapper } from './data/typeorm/data-source-wrapper';

export default {
  config(container: Container) {
    container.bind(diIdentifiers.QUERY_BUS).to(QueryBusInMemory);
    container.bind(QueryHandlersRepository).toSelf();
    container
      .bind<DataSourceConfig>(diIdentifiers.DATA_SOURCE_CONFIG)
      .toConstantValue(dataSourceConfig);
    container.bind(DataSourceWrapper).toSelf();
  }
} satisfies ConfigExecutor;
