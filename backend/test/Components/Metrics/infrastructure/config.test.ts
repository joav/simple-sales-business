import { Container } from 'inversify';
import MetrictsConfigExecutor from '@Components/Metrics/infrastructure/config/metrics.config-executor';
import { GetAggregatesQueryHandler } from '@Components/Metrics/application/get-aggregates/get-aggregates.query-handler';
import sharedIdentifiers from '@Components/Shared/infrastructure/di-identifiers';
import metricsDiIdentifiers from '@Components/Metrics/infrastructure/config/di-identifiers';
import { AggregatesInMemoryRepository } from '@Components/Metrics/infrastructure/data/in-memory/aggregates.in-memory.repository';


describe('Metrics Config', () => {
  let container: Container;
  beforeEach(() => {
    container = new Container();
    MetrictsConfigExecutor.config(container);
    container.unbind(metricsDiIdentifiers.AGGREGATES_REPOSITORY);
    container.bind(metricsDiIdentifiers.AGGREGATES_REPOSITORY).to(AggregatesInMemoryRepository);
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
});
