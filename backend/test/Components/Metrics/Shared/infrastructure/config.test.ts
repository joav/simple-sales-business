import { Container } from 'inversify';
import { metricsConfigExecutor } from '@Metrics/Shared/infrastructure';
import { GetAggregatesQueryHandler, GetAggregateValueQueryHandler } from '@Metrics/Aggregates/application';
import sharedIdentifiers from '@Components/Shared/infrastructure/di-identifiers';
import { metricsSharedDiIdentifiers } from '@Metrics/Shared/infrastructure';
import { AggregatesInMemoryRepository, AggregatesRoutes } from '@Components/Metrics/Aggregates/infrastructure';

class MyQueryBus { }

describe('Metrics Config', () => {
  let container: Container;
  beforeEach(() => {
    container = new Container();

    container.bind(sharedIdentifiers.QUERY_BUS).to(MyQueryBus);
    metricsConfigExecutor.config(container);
    container.unbind(metricsSharedDiIdentifiers.AGGREGATES_REPOSITORY);
    container.bind(metricsSharedDiIdentifiers.AGGREGATES_REPOSITORY).to(AggregatesInMemoryRepository);
  });
  it('should QUERY_HANDLER resolved', () => {
    const handlers = container.getAll(sharedIdentifiers.QUERY_HANDLER);
    expect(handlers).toBeTruthy();
    expect(handlers.length).toBeTruthy();
  });
  it('should GetAggregatesQueryHandler resolved', () => {
    const handler = container.get(GetAggregatesQueryHandler);
    expect(handler).toBeTruthy();
  });
  it('should AggregatesRoutes resolved', () => {
    const routes = container.get(AggregatesRoutes);
    expect(routes).toBeTruthy();
  });
  it('should GetAggregateValueQueryHandler resolved', () => {
    const handler = container.get(GetAggregateValueQueryHandler);
    expect(handler).toBeTruthy();
  });
});
