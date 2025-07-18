import { AggregatesGetter, GetAggregatesQueryHandler, AggregateValueGetter, GetAggregateValueQueryHandler } from '@Metrics/Aggregates/application';
import { MetricsRoutes } from '@Metrics/Shared/infrastructure';
import express from 'express';
import { Container } from 'inversify';
import request from 'supertest';
import { AggregatesInMemoryRepository, GetAggregatesController, GetAggregateValueController, AggregatesRoutes, LOGGER as LOGGER_AGGREGATES, configLogger as configAggregatesLogger } from '@Metrics/Aggregates/infrastructure';
import { sharedDiIdentifiers, QueryHandlersRepository, QueryBusInMemory, getLogger } from '@Shared/infrastructure';
import { GetTimeSerieQueryHandler, GetTimeSeriesQueryHandler, TimeSerieGetter, TimeSeriesGetter } from '@Metrics/TimeSeries/application';
import { GetTimeSerieController, GetTimeSeriesController, TimeSeriesInMemoryRepository, TimeSeriesRoutes, LOGGER as LOGGER_TIME_SERIES, configLogger as configTimeSeriesLogger } from '@Metrics/TimeSeries/infrastructure';
import { GetRankingQueryHandler, GetRankingsQueryHandler, RankingGetter, RankingsGetter } from '@Metrics/Rankings/application';
import { GetRankingController, GetRankingsController, RankingsInMemoryRepository, RankingsRoutes, LOGGER as LOGGER_RANKINGS, configLogger as configRankingsLogger } from '@Metrics/Rankings/infrastructure';

describe('Metrics API', () => {
  let app: express.Express;

  beforeEach(() => {
    const container = new Container();
    
    configAggregatesLogger();
    const loggerAggregates = getLogger(LOGGER_AGGREGATES);
    const aggregatesGetter = new AggregatesGetter(new AggregatesInMemoryRepository());
    const aggregatesHandler = new GetAggregatesQueryHandler(aggregatesGetter, loggerAggregates);
    const getterValue = new AggregateValueGetter(new AggregatesInMemoryRepository());
    const handlerValue = new GetAggregateValueQueryHandler(getterValue, loggerAggregates);
    container.bind(sharedDiIdentifiers.QUERY_HANDLER).toConstantValue(aggregatesHandler);
    container.bind(sharedDiIdentifiers.QUERY_HANDLER).toConstantValue(handlerValue);
    container.bind(sharedDiIdentifiers.LOGGER).toConstantValue(loggerAggregates).whenNamed(LOGGER_AGGREGATES);
    container.bind(GetAggregatesController).toSelf();
    container.bind(GetAggregateValueController).toSelf();
    container.bind(AggregatesRoutes).toSelf();

    configTimeSeriesLogger();
    const loggerTimeSeries = getLogger(LOGGER_TIME_SERIES);
    const timeSeriesGetter = new TimeSeriesGetter(new TimeSeriesInMemoryRepository());
    const timeSeriesHandler = new GetTimeSeriesQueryHandler(timeSeriesGetter, loggerTimeSeries);
    container.bind(sharedDiIdentifiers.LOGGER).toConstantValue(loggerTimeSeries).whenNamed(LOGGER_TIME_SERIES);
    container.bind(sharedDiIdentifiers.QUERY_HANDLER).toConstantValue(timeSeriesHandler);
    container.bind(GetTimeSerieController).toSelf();
    container.bind(GetTimeSeriesController).toSelf();
    container.bind(TimeSeriesRoutes).toSelf();

    const timeSerieGetter = new TimeSerieGetter(new TimeSeriesInMemoryRepository());
    const timeSerieHandler = new GetTimeSerieQueryHandler(timeSerieGetter, loggerTimeSeries);
    container.bind(sharedDiIdentifiers.QUERY_HANDLER).toConstantValue(timeSerieHandler);

    configRankingsLogger();
    const loggerRankings = getLogger(LOGGER_RANKINGS);
    const rankingsGetter = new RankingsGetter(new RankingsInMemoryRepository());
    const rankingsHandler = new GetRankingsQueryHandler(rankingsGetter, loggerRankings);
    container.bind(sharedDiIdentifiers.QUERY_HANDLER).toConstantValue(rankingsHandler);
    const rankingGetter = new RankingGetter(new RankingsInMemoryRepository());
    const rankingHandler = new GetRankingQueryHandler(rankingGetter, loggerRankings);
    container.bind(sharedDiIdentifiers.QUERY_HANDLER).toConstantValue(rankingHandler);
    container.bind(sharedDiIdentifiers.LOGGER).toConstantValue(loggerRankings).whenNamed(LOGGER_RANKINGS);
    container.bind(GetRankingsController).toSelf();
    container.bind(GetRankingController).toSelf();
    container.bind(RankingsRoutes).toSelf();

    container.bind(QueryHandlersRepository).toSelf();
    container.bind(sharedDiIdentifiers.QUERY_BUS).to(QueryBusInMemory);
    container.bind(MetricsRoutes).toSelf();
    app = express();
    app.use('/metrics', container.get(MetricsRoutes).getRouter());
  });

  describe('Aggregates API', () => {
    it('should GET /metrics/products/aggregates return 200 with aggregates', async () => {
      const response = await request(app).get('/metrics/products/aggregates');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: {
          statusCode: 0,
          statusMessage: "Ok",
          httpStatusCode: 200
        },
        data: [
          {
            aggregateId: "some-count",
            category: "products",
            aggregateFn: "RECOUNT"
          }
        ]
      });
    });

    it('should GET /metrics/products/aggregates/some-count return 200 with aggregate value', async () => {
      const response = await request(app).get('/metrics/products/aggregates/some-count');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: {
          statusCode: 0,
          statusMessage: "Ok",
          httpStatusCode: 200
        },
        data:
        {
          aggregateId: "some-count",
          category: "products",
          aggregateFn: "RECOUNT",
          aggregateValue: 5,
          lastUpdate: '2025-06-21T08:08:08.060Z'
        }
      });
    });
  });

  describe('TimeSeries API', () => {
    it('should GET /metrics/products/series return 200 with series', async () => {
      const response = await request(app).get('/metrics/products/series');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: {
          statusCode: 0,
          statusMessage: "Ok",
          httpStatusCode: 200
        },
        data: [
          {
            timeSerieSlug: "some-time-serie",
            category: "products"
          }
        ]
      });
    });
    it('should GET /metrics/products/series/some-time-serie return 200 with series', async () => {
      const response = await request(app).get('/metrics/products/series/some-time-serie');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: {
          statusCode: 0,
          statusMessage: "Ok",
          httpStatusCode: 200
        },
        data: {
          timeSerieSlug: 'some-time-serie',
          category: 'products',
          data: [{
            date: '2025-06-06T02:02:02.060Z',
            value: 5
          }]
        }
      });
    });
  });

  describe('TimeSeries API', () => {
    it('should GET /metrics/products/rankings return 200 with series', async () => {
      const response = await request(app).get('/metrics/products/rankings');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: {
          statusCode: 0,
          statusMessage: "Ok",
          httpStatusCode: 200
        },
        data: [
          {
            rankingSlug: "some-ranking",
            rankingValueTitle: "Ranking value title",
            category: "products"
          }
        ]
      });
    });
    it('should GET /metrics/products/rankings/some-ranking return 200 with series', async () => {
      const response = await request(app).get('/metrics/products/rankings/some-ranking');
      expect(response.status).toBe(200);
      expect(response.body).toEqual({
        status: {
          statusCode: 0,
          statusMessage: "Ok",
          httpStatusCode: 200
        },
        data: {
          rankingSlug: 'some-ranking',
          rankingValueTitle: 'Title',
          category: 'products',
          data: [{
            id: 'some-id',
            name: 'Name',
            lastUpdate: '2025-06-06T02:02:02.060Z',
            value: 5
          }]
        }
      });
    });
  });
});
