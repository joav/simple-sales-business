import { Express } from 'express';
import { inject, injectable } from 'inversify';
import { HomeRoutes } from './home.routes';
import { StatusRoutes } from './status.routes';
import { ApiRoutes } from './api.routes';

@injectable('Singleton')
export class AppRoutes {
  constructor(
    @inject(HomeRoutes) private readonly homeRoutes: HomeRoutes,
    @inject(ApiRoutes) private readonly apiRoutes: ApiRoutes,
    @inject(StatusRoutes) private readonly statusRoutes: StatusRoutes
  ) {
    this.apiRoutes.setRoutes();
  }

  setRoutes(app: Express) {
    app.use('', this.homeRoutes.getRouter());
    app.use('/api/v1', this.apiRoutes.getRouter());
    app.use('/status', this.statusRoutes.getRouter());
  }
}
