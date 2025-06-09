import { App } from '@App';
import appConfig from '@App/Config/app.config';
import { Container } from 'inversify';
import path from 'node:path';
import request from 'supertest';

describe('GET /', () => {
  let container: Container;
  let app: App;
  beforeEach(() => {
    const openapiPath = path.resolve(__dirname, '../../openapi.json');
    container = new Container();
    appConfig.config(container, {
      openapiPath
    });
    app = container.get(App);
  });
  it('responds with 200 and OK', async () => {
    const response = await request(app.getApp()).get('/');
    expect(response.status).toBe(200);
    expect(response.text).toBe('OK');
  });
});
