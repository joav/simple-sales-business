import config from "@Components/Shared/infrastructure/config";
import diIdentifiers from "@Components/Shared/infrastructure/di-identifiers";
import { QueryBusInMemory } from "@Components/Shared/infrastructure/Query-Bus/query-bus.in-memory";
import { Container } from "inversify";

describe('Shared Config', () => {
  let container: Container;
  beforeEach(() => {
    container = new Container();

    config.config(container);
  });
  it('should bind QueryBusInMemory to QUERY_BUS', () => {
    const queryBus = container.get(diIdentifiers.QUERY_BUS);
    expect(queryBus).toBeDefined();
    expect(queryBus.constructor).toBe(QueryBusInMemory);
  });
});
