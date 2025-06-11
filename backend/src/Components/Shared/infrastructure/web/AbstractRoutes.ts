import { Router } from 'express';
import { Routes } from './Routes';

export abstract class AbstractRoutes implements Routes {
  protected router: Router;

  constructor() {
    this.router = Router();
  }

  getRouter(): Router {
    return this.router;
  }
}
