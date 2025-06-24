import { sharedConfig, sharedDiIdentifiers, QueryBusInMemory, DataSourceWrapper } from "@Shared/infrastructure";
import { Container } from "inversify";

describe('Shared Config', () => {
  let container: Container;
  beforeEach(() => {
    container = new Container();

    sharedConfig.config(container);
    container.unbind(sharedDiIdentifiers.DATA_SOURCE_CONFIG);
    container.bind(sharedDiIdentifiers.DATA_SOURCE_CONFIG).toConstantValue({
      init() {
        return Promise.resolve({})
      }
    })
  });
  it('should bind QueryBusInMemory to QUERY_BUS', () => {
    const queryBus = container.get(sharedDiIdentifiers.QUERY_BUS);
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
