import { Container } from 'inversify';
import AppConfig from './Config/app.config';
import express, { Express } from 'express';
import swaggerConfig from './Swagger/swagger.config';
import { Server } from 'node:http';

export class App {
  static config(container: Container) {
    AppConfig.config(container);
  }

  private openapiPath: string;
  private webPort: number;
  private app: Express;
  private httpServer?: Server;

  constructor(params: Partial<AppParams>) {
    this.openapiPath = params.openapiPath ?? './openapi.json';
    this.webPort = params.webPort ?? 3500;
    this.app = express();
    this.initialize();
  }

  private initialize() {
    this.initSwagger();
    this.useMiddlewares();
    this.setRoutes();
  }

  private initSwagger() {
    const swaggerHandlers = swaggerConfig.init({
      openapiPath: this.openapiPath,
      validateRequests: true
    });

    this.app.use('/api-docs', swaggerHandlers.serve, swaggerHandlers.docsHandler);
  }

  private useMiddlewares() {
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
  }

  private setRoutes() {}

  start() {
    this.httpServer = this.app.listen(this.webPort, () => {
      console.log(`Server running on port ${this.webPort}`);
      console.log(`View docs at: http://localhost:${this.webPort}/api-docs`);
    });
  }

  stop = () => {
    console.log('Shutting down gracefully...');

    if (!this.httpServer) this.serverClosedInformation();

    this.httpServer.close((e) => {
      if (e) {
        console.error(e);
        process.exit(1);
      }

      console.log('Server closed.');

      // Close any other connections or resources here

      process.exit(0);
    });

    // Force close the server after 5 seconds
    setTimeout(() => {
      console.error('Could not close connections in time, forcefully shutting down');
      process.exit(1);
    }, 5000);
  };

  private serverClosedInformation() {
    console.log('Server closed.');

    process.exit(0);
  }
}
