import { GetAggregatesController } from '@Components/Metrics/infrastructure/web/Controllers/get-aggregates.controller';
import { AggregatesRoutes } from '@Components/Metrics/infrastructure/web/Routes/aggregates.routes';
import express from 'express';
import { Container } from 'inversify';
import request from 'supertest';

describe('Metrics Aggregates API', () => {
  let app: express.Express;

  beforeEach(() => {
    const container = new Container();
    container.bind(GetAggregatesController).toSelf();
    container.bind(AggregatesRoutes).toSelf();
    app = express();
    app.use(container.get(AggregatesRoutes).getRouter());
  });

  it('should GET / return 200 with aggregates', async () => {
    const response = await request(app).get('/');
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
});
