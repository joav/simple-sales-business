import { Router } from 'express';

export interface Routes {
  getRouter(): Router;
}
