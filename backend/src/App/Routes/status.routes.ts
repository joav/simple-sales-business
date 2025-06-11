import { StatusController } from '@App/Controllers/status.controller';
import { Routes } from '@Components/Shared/infrastructure/web/Routes';
import { Router } from 'express';
import { inject, injectable } from 'inversify';

@injectable('Singleton')
export class StatusRoutes implements Routes {
  private router: Router;
  constructor(@inject(StatusController) private readonly statusController: StatusController) {
    this.router = Router();
    this.setRoutes();
  }

  private setRoutes() {
    this.router.get('', this.statusController.handleRequest);
  }

  getRouter(): Router {
    return this.router;
  }
}
