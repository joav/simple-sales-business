import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { QueryBus } from '@Shared/domain';
import { Controller, sharedDiIdentifiers, successResponse } from '@Shared/infrastructure';
import { GetRankingsQuery, GetRankingsResponse } from '@Metrics/Rankings/application';

@injectable('Singleton')
export class GetRankingsController implements Controller {
  constructor(@inject(sharedDiIdentifiers.QUERY_BUS) private queryBus: QueryBus) {}

  handleRequest = async (req: Request, res: Response) => {
    const query = new GetRankingsQuery(req.params.category);
    const result = await this.queryBus.ask<GetRankingsResponse>(query);
    const response = successResponse(result.rankings, StatusCodes.OK);
    res.status(response.status.httpStatusCode).json(response);
  };
}
