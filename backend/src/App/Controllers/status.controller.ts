import { Controller } from '@Components/Shared/infrastructure/web/Controller';
import { Response } from 'express';

export class StatusController implements Controller {
  handleRequest(_, res: Response) {
    res.status(200).send('OK');
  }
}
