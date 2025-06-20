import config from "@Components/Shared/infrastructure/config";
import { DataSourceWrapper } from "@Components/Shared/infrastructure/data/typeorm/data-source-wrapper";
import diIdentifiers from "@Components/Shared/infrastructure/di-identifiers";
import { QueryBusInMemory } from "@Components/Shared/infrastructure/Query-Bus/query-bus.in-memory";
import { Container } from "inversify";

describe('Shared Config', () => {
  let container: Container;
  beforeEach(() => {
    container = new Container();

    config.config(container);
    container.unbind(diIdentifiers.DATA_SOURCE_CONFIG);
    container.bind(diIdentifiers.DATA_SOURCE_CONFIG).toConstantValue({
      init() {
        return Promise.resolve({})
      }
    })
  });
  it('should bind QueryBusInMemory to QUERY_BUS', () => {
    const queryBus = container.get(diIdentifiers.QUERY_BUS);
    expect(queryBus).toBeDefined();
    expect(queryBus.constructor).toBe(QueryBusInMemory);
  });
  it('should bind DataSourceWrapper', async () => {
    const dataSourceWrapper = container.get(DataSourceWrapper);
    let dataSource = await dataSourceWrapper.dataSource;
    expect(dataSourceWrapper).toBeDefined();
    expect(dataSourceWrapper.constructor).toBe(DataSourceWrapper);
    expect(dataSource).toBeDefined();
    dataSource = await dataSourceWrapper.dataSource;
    expect(dataSource).toBeDefined();
  });
});
