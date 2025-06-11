import { Express } from 'express';
import { inject } from 'inversify';
import { HomeRoutes } from './home.routes';
import { StatusRoutes } from './status.routes';

export class AppRoutes {
  constructor(
    @inject(HomeRoutes) private readonly homeRoutes: HomeRoutes,
    // @inject(ApiRoutes) private apiRoutes: ApiRoutes,
    @inject(StatusRoutes) private statusRoutes: StatusRoutes
  ) {}

  setRoutes(app: Express) {
    app.use('', this.homeRoutes.getRouter());
    // app.use('api/v1');
    app.use('/status', this.statusRoutes.getRouter());
  }
}
