import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { GetRankingQuery, GetRankingResponse } from '@Metrics/Rankings/application';
import { QueryBus } from '@Shared/domain';
import { Controller, sharedDiIdentifiers, successResponse } from '@Shared/infrastructure';

@injectable('Singleton')
export class GetRankingController implements Controller {
  constructor(@inject(sharedDiIdentifiers.QUERY_BUS) private queryBus: QueryBus) {}

  handleRequest = async (req: Request, res: Response) => {
    const query = new GetRankingQuery(req.params.category, req.params.rankingSlug);
    const result = await this.queryBus.ask<GetRankingResponse>(query);
    const response = successResponse(result.ranking, StatusCodes.OK);
    res.status(response.status.httpStatusCode).json(response);
  };
}
