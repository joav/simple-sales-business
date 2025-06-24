import { Container } from 'inversify';
import { metricsConfigExecutor } from '@Metrics/Shared/infrastructure';
import { GetAggregatesQueryHandler, GetAggregateValueQueryHandler } from '@Metrics/Aggregates/application';
import { metricsSharedDiIdentifiers } from '@Metrics/Shared/infrastructure';
import { AggregatesInMemoryRepository, AggregatesRoutes } from '@Metrics/Aggregates/infrastructure';
import { sharedDiIdentifiers } from '@Shared/infrastructure';
import { GetTimeSeriesQueryHandler } from '@Metrics/TimeSeries/application';
import { TimeSeriesInMemoryRepository } from '@Metrics/TimeSeries/infrastructure';

class MyQueryBus { }

describe('Metrics Config', () => {
  let container: Container;
  beforeEach(() => {
    container = new Container();

    container.bind(sharedDiIdentifiers.QUERY_BUS).to(MyQueryBus);
    metricsConfigExecutor.config(container);
    container.unbind(metricsSharedDiIdentifiers.AGGREGATES_REPOSITORY);
    container.bind(metricsSharedDiIdentifiers.AGGREGATES_REPOSITORY).to(AggregatesInMemoryRepository);
    container.unbind(metricsSharedDiIdentifiers.TIME_SERIES_REPOSITORY);
    container.bind(metricsSharedDiIdentifiers.TIME_SERIES_REPOSITORY).to(TimeSeriesInMemoryRepository);
  });
  it('should QUERY_HANDLER resolved', () => {
    const handlers = container.getAll(sharedDiIdentifiers.QUERY_HANDLER);
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
  it('should GetTimeSeriesQueryHandler resolved', () => {
    const handler = container.get(GetTimeSeriesQueryHandler);
    expect(handler).toBeTruthy();
  });
});
