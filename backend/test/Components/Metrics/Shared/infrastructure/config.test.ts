import { Container } from 'inversify';
import { metricsConfigExecutor } from '@Metrics/Shared/infrastructure';
import { GetAggregatesQueryHandler, GetAggregateValueQueryHandler } from '@Metrics/Aggregates/application';
import { metricsSharedDiIdentifiers } from '@Metrics/Shared/infrastructure';
import { AggregatesInMemoryRepository, AggregatesRoutes } from '@Metrics/Aggregates/infrastructure';
import { sharedDiIdentifiers } from '@Shared/infrastructure';
import { GetTimeSerieQueryHandler, GetTimeSeriesQueryHandler } from '@Metrics/TimeSeries/application';
import { TimeSeriesInMemoryRepository, TimeSeriesRoutes } from '@Metrics/TimeSeries/infrastructure';
import { GetRankingsQueryHandler } from '@Metrics/Rankings/application';
import { RankingsInMemoryRepository } from '@Metrics/Rankings/infrastructure';

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
    container.unbind(metricsSharedDiIdentifiers.RANKINGS_REPOSITORY);
    container.bind(metricsSharedDiIdentifiers.RANKINGS_REPOSITORY).to(RankingsInMemoryRepository);
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
  it('should TimeSeriesRoutes resolved', () => {
    const routes = container.get(TimeSeriesRoutes);
    expect(routes).toBeTruthy();
  });
  it('should GetTimeSerieQueryHandler resolved', () => {
    const handler = container.get(GetTimeSerieQueryHandler);
    expect(handler).toBeTruthy();
  });
  it('should GetRankingsQueryHandler resolved', () => {
    const handler = container.get(GetRankingsQueryHandler);
    expect(handler).toBeTruthy();
  });
});
