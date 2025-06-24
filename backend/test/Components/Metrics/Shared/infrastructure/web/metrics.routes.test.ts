import { AggregatesGetter, GetAggregatesQueryHandler, AggregateValueGetter, GetAggregateValueQueryHandler } from '@Metrics/Aggregates/application';
import { MetricsRoutes } from '@Metrics/Shared/infrastructure';
import sharedDiIdentifiers from '@Components/Shared/infrastructure/di-identifiers';
import { QueryBusInMemory } from '@Components/Shared/infrastructure/Query-Bus/query-bus.in-memory';
import { QueryHandlersRepository } from '@Components/Shared/infrastructure/Query-Bus/query-handlers.repository';
import express from 'express';
import { Container } from 'inversify';
import request from 'supertest';
import { AggregatesInMemoryRepository, GetAggregatesController, GetAggregateValueController, AggregatesRoutes } from '@Components/Metrics/Aggregates/infrastructure';

describe('Metrics API', () => {
  let app: express.Express;

  beforeEach(() => {
    const container = new Container();

    const getter = new AggregatesGetter(new AggregatesInMemoryRepository());
    const handler = new GetAggregatesQueryHandler(getter);
    const getterValue = new AggregateValueGetter(new AggregatesInMemoryRepository());
    const handlerValue = new GetAggregateValueQueryHandler(getterValue);
    container.bind(sharedDiIdentifiers.QUERY_HANDLER).toConstantValue(handler);
    container.bind(sharedDiIdentifiers.QUERY_HANDLER).toConstantValue(handlerValue);
    container.bind(QueryHandlersRepository).toSelf();
    container.bind(sharedDiIdentifiers.QUERY_BUS).to(QueryBusInMemory);

    container.bind(GetAggregatesController).toSelf();
    container.bind(GetAggregateValueController).toSelf();
    container.bind(AggregatesRoutes).toSelf();
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
  })

});
