import { AggregatesGetter } from '@Components/Metrics/application/get-aggregates/aggregates-getter';
import { GetAggregatesQueryHandler } from '@Components/Metrics/application/get-aggregates/get-aggregates.query-handler';
import { AggregateValueGetter } from '@Components/Metrics/application/get-aggregate-value/aggregate-value-getter';
import { GetAggregateValueQueryHandler } from '@Components/Metrics/application/get-aggregate-value/get-aggregate-value.query-handler';
import { AggregatesInMemoryRepository } from '@Components/Metrics/infrastructure/data/in-memory/aggregates.in-memory.repository';
import { GetAggregatesController } from '@Components/Metrics/infrastructure/web/Controllers/get-aggregates.controller';
import { GetAggregateValueController } from '@Components/Metrics/infrastructure/web/Controllers/get-aggregate-value.controller';
import { AggregatesRoutes } from '@Components/Metrics/infrastructure/web/Routes/aggregates.routes';
import { MetricsRoutes } from '@Components/Metrics/infrastructure/web/Routes/metrics.routes';
import sharedDiIdentifiers from '@Components/Shared/infrastructure/di-identifiers';
import { QueryBusInMemory } from '@Components/Shared/infrastructure/Query-Bus/query-bus.in-memory';
import { QueryHandlersRepository } from '@Components/Shared/infrastructure/Query-Bus/query-handlers.repository';
import express from 'express';
import { Container } from 'inversify';
import request from 'supertest';

describe('Metrics API', () => {
  let app: express.Express;

  beforeEach(() => {
    const container = new Container();

    const getter = new AggregatesGetter(new AggregatesInMemoryRepository());
    const handler = new GetAggregatesQueryHandler(getter);
    const getterValue = new AggregateValueGetter(new AggregatesInMemoryRepository());
    const handlerValue = new GetAggregateValueQueryHandler(getter);
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
