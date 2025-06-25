import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { GetTimeSerieQuery, GetTimeSerieResponse } from '@Metrics/TimeSeries/application';
import { QueryBus } from '@Shared/domain';
import { Controller, sharedDiIdentifiers, successResponse } from '@Shared/infrastructure';

@injectable('Singleton')
export class GetTimeSerieController implements Controller {
  constructor(@inject(sharedDiIdentifiers.QUERY_BUS) private queryBus: QueryBus) {}

  handleRequest = async (req: Request, res: Response) => {
    const query = new GetTimeSerieQuery(req.params.category, req.params.timeSerieSlug);
    const result = await this.queryBus.ask<GetTimeSerieResponse>(query);
    const response = successResponse(result.timeSerie, StatusCodes.OK);
    res.status(response.status.httpStatusCode).json(response);
  };
}
