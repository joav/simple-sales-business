import { HomeController } from '../Controllers/home.controller';
import { Routes } from '@Components/Shared/infrastructure/web/Routes';
import { Router } from 'express';
import { inject } from 'inversify';

export class HomeRoutes implements Routes {
  private router: Router;
  constructor(@inject(HomeController) private readonly homeController: HomeController) {
    this.router = Router();
    this.setRoutes();
  }

  private setRoutes() {
    this.router.get('', this.homeController.handleRequest);
  }

  getRouter(): Router {
    return this.router;
  }
}
