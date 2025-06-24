import { Container } from 'inversify';
import { ConfigExecutor } from './config-executor';
import { sharedDiIdentifiers } from './di-identifiers';
import { QueryBusInMemory } from './Query-Bus/query-bus.in-memory';
import { QueryHandlersRepository } from './Query-Bus/query-handlers.repository';
import { DataSourceConfig, dataSourceConfig } from './data/typeorm/data-source.config';
import { DataSourceWrapper } from './data/typeorm/data-source-wrapper';
import { TypeormRepository } from './data/typeorm/typeorm.repository';

export const sharedConfig = {
  config(container: Container) {
    container.bind(sharedDiIdentifiers.QUERY_BUS).to(QueryBusInMemory);
    container.bind(QueryHandlersRepository).toSelf();
    container
      .bind<DataSourceConfig>(sharedDiIdentifiers.DATA_SOURCE_CONFIG)
      .toConstantValue(dataSourceConfig);
    container.bind(DataSourceWrapper).toSelf();
    container.bind(TypeormRepository).toSelf();
  }
} satisfies ConfigExecutor;
