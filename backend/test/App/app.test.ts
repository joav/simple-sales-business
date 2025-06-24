import { App } from '@App';
import appConfig from '@App/Config/app.config';
import diIdentifiers from '@App/Config/di-identifiers';
import { AppRoutes } from '@App/Routes/app.routes';
import { AbstractRoutes, ComponentRoute } from '@Shared/infrastructure';
import { Container, injectable } from 'inversify';
import path from 'node:path';
import request from 'supertest';

@injectable('Singleton')
class MyComponentRoute extends AbstractRoutes implements ComponentRoute {
  path = '/metrics/products/aggregates';
  constructor() {
    super();
    this.router.get('', (_, res) => {
      res.status(200).send('My Component OK');
    });
  }
}

describe('App', () => {
  let container: Container;
  let app: App;
  beforeEach(() => {
    container = new Container();
  });
  it('should exist', () => {
    setDefaultContainer();

    expect(app).toBeTruthy();
  });
  it('should stop and only exit', () => {
    setDefaultContainer({
      process: {
        exit: jest.fn()
      } as any
    });

    app.stop();

    expect(container.get<any>(diIdentifiers.APP_PARAMS).process.exit).toHaveBeenCalledWith(0);
  });
  it('should start and stop with timeout', () => {
    jest.useFakeTimers();
    setDefaultContainer({
      process: {
        exit: jest.fn()
      } as any,
      closeTimeout: 0
    });
    jest.spyOn(app.getApp(), 'listen').mockImplementation((_, callback) => {
      callback();
      return {
        close: jest.fn()
      } as any;
    });

    app.start();
    app.stop();

    jest.runAllTimers();
    jest.clearAllTimers();
    jest.useRealTimers();

    expect(container.get<any>(diIdentifiers.APP_PARAMS).process.exit).toHaveBeenCalledWith(1);
  });

  describe('handle server close', () => {
    beforeEach(() => {
      setDefaultContainer({
        process: {
          exit: jest.fn()
        } as any
      });
    });

    it('should handle server close with error', () => {
      app.handleServerClose(new Error('Test error'));

      expect(container.get<any>(diIdentifiers.APP_PARAMS).process.exit).toHaveBeenCalledWith(1);
    });

    it('should handle server close without error', () => {
      app.handleServerClose();

      expect(container.get<any>(diIdentifiers.APP_PARAMS).process.exit).toHaveBeenCalledWith(0);
    });
  });

  describe('api', () => {
    beforeEach(() => {
      const openapiPath = path.resolve(__dirname, '../../openapi.json');
      appConfig.config(container, {
        openapiPath,
        closeTimeout: 5000,
        webPort: 3500,
        process
      });
      container.bind(diIdentifiers.COMPONENT_ROUTES).to(MyComponentRoute);
      setApp();
    });
    it('GET / responds with 200 and OK', async () => {
      const response = await request(app.getApp()).get('/');
      expect(response.status).toBe(200);
      expect(response.text).toBe('OK');
    });
    it('GET /status responds with 200 and OK', async () => {
      const response = await request(app.getApp()).get('/status');
      expect(response.status).toBe(200);
      expect(response.text).toBe('OK');
    });
    it('GET /api/v1 responds with 302', async () => {
      const response = await request(app.getApp()).get('/api/v1');
      expect(response.status).toBe(302);
    });
    it('GET /api/v1/metrics/products/aggregates responds with 200 and OK', async () => {
      const response = await request(app.getApp()).get('/api/v1/metrics/products/aggregates');
      expect(response.status).toBe(200);
      expect(response.text).toBe('My Component OK');
    });
  });

  function setDefaultContainer(params: Partial<AppParams> = {}) {
    container.bind(AppRoutes).toConstantValue({
      setRoutes: jest.fn()
    } as any);
    container.bind(diIdentifiers.SWAGGER_CONFIG).toConstantValue({
      init: () => ({
        serve: jest.fn(),
        docsHandler: jest.fn(),
        validator: jest.fn()
      })
    } as any);
    container.bind<Partial<AppParams>>(diIdentifiers.APP_PARAMS).toConstantValue(params);
    container.bind(App).toSelf();
    setApp();
  }

  function setApp() {
    app = container.get(App);
  }
});
