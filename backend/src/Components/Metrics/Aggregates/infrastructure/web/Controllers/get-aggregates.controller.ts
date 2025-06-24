import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { GetAggregatesQuery, GetAggregatesResponse } from '@Metrics/Aggregates/application';
import { QueryBus } from '@Shared/domain';
import { Controller, sharedDiIdentifiers, successResponse } from '@Shared/infrastructure';

@injectable('Singleton')
export class GetAggregatesController implements Controller {
  constructor(@inject(sharedDiIdentifiers.QUERY_BUS) private queryBus: QueryBus) {}

  handleRequest = async (req: Request, res: Response) => {
    const query = new GetAggregatesQuery(req.params.category);
    const result = await this.queryBus.ask<GetAggregatesResponse>(query);
    const response = successResponse(result.aggregates, StatusCodes.OK);
    res.status(response.status.httpStatusCode).json(response);
  };
}
