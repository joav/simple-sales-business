import { Controller } from '@Components/Shared/infrastructure/web/Controller';
import { successResponse } from '@Components/Shared/infrastructure/web/responses/success-response';
import { Response } from 'express';
import { injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';

@injectable('Singleton')
export class GetAggregatesController implements Controller {
  handleRequest(_, res: Response) {
    const response = successResponse(
      [
        {
          aggregateId: 'some-count',
          aggregateFn: 'RECOUNT',
          category: 'products'
        }
      ],
      StatusCodes.OK
    );
    res.status(response.status.httpStatusCode).send(response);
  }
}
