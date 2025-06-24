import { Controller } from '@Shared/infrastructure';
import { Response } from 'express';
import { injectable } from 'inversify';

@injectable('Singleton')
export class StatusController implements Controller {
  handleRequest(_, res: Response) {
    res.status(200).send('OK');
  }
}
