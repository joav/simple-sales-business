import { inject, injectable } from 'inversify';
import express, { Express } from 'express';
import { Server } from 'node:http';
import { AppRoutes } from './Routes/app.routes';
import diIdentifiers from './Config/di-identifiers';
import { OpenApiRequestHandler } from 'express-openapi-validator/dist/framework/types';
import { appErrorHandler } from './app.error-handler';

@injectable('Singleton')
export class App {
  private openapiPath: string;
  private webPort: number;
  private app: Express;
  private httpServer?: Server;
  private closeTimeout: number;
  private process: NodeJS.Process;

  constructor(
    @inject(diIdentifiers.APP_PARAMS) params: Partial<AppParams>,
    @inject(AppRoutes) private readonly appRoutes: AppRoutes,
    @inject(diIdentifiers.SWAGGER_CONFIG) private readonly swaggerConfig: SwaggerConfig
  ) {
    this.openapiPath = params.openapiPath ?? './openapi.json';
    this.webPort = params.webPort ?? 3500;
    this.closeTimeout = params.closeTimeout ?? 5000;
    this.process = params.process ?? process;
    this.app = express();
    this.initialize();
  }

  private initialize() {
    const swaggerValidator = this.initSwagger();
    this.useMiddlewares(swaggerValidator);
    this.setRoutes();
    this.setErrorHandler();
  }

  private initSwagger() {
    const swaggerHandlers = this.swaggerConfig.init({
      openapiPath: this.openapiPath,
      validateRequests: true
    });

    this.app.use('/api-docs', swaggerHandlers.serve, swaggerHandlers.docsHandler);

    return swaggerHandlers.validator;
  }

  private useMiddlewares(swaggerValidator: unknown) {
    this.app.use(
      express.urlencoded({
        extended: false,
        type: 'application/x-www-form-urlencoded'
      })
    );
    this.app.use(
      express.text({
        type: 'text/plain'
      })
    );
    this.app.use(
      express.json({
        type: 'application/json'
      })
    );
    this.app.use(swaggerValidator as OpenApiRequestHandler[]);
  }

  private setRoutes() {
    this.appRoutes.setRoutes(this.app);
  }

  private setErrorHandler() {
    this.app.use(appErrorHandler);
  }

  start() {
    this.httpServer = this.app.listen(this.webPort, () => {
      console.log(`Server running on port ${this.webPort}`);
      console.log(`View docs at: http://localhost:${this.webPort}/api-docs`);
    });
  }

  stop = () => {
    console.log('Shutting down gracefully...');

    if (!this.httpServer) return this.serverClosedInformation();

    this.httpServer.close(this.handleServerClose);

    // Force close the server after timeout
    setTimeout(this.handleServerCloseTimeout, this.closeTimeout);
  };

  private serverClosedInformation() {
    console.log('Server closed.');

    this.process.exit(0);
  }

  getApp(): Express {
    return this.app;
  }

  handleServerClose = (e?: Error) => {
    if (e) {
      console.log(e);
      return this.process.exit(1);
    }

    console.log('Server closed.');

    // Close any other connections or resources here

    this.process.exit(0);
  };

  handleServerCloseTimeout = () => {
    console.log('Could not close connections in time, forcefully shutting down');
    this.process.exit(1);
  };
}
