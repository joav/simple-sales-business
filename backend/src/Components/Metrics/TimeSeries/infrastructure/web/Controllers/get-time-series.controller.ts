import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { QueryBus } from '@Shared/domain';
import { Controller, sharedDiIdentifiers, successResponse } from '@Shared/infrastructure';
import { GetTimeSeriesQuery, GetTimeSeriesResponse } from '@Metrics/TimeSeries/application';

@injectable('Singleton')
export class GetTimeSeriesController implements Controller {
  constructor(@inject(sharedDiIdentifiers.QUERY_BUS) private queryBus: QueryBus) {}

  handleRequest = async (req: Request, res: Response) => {
    const query = new GetTimeSeriesQuery(req.params.category);
    const result = await this.queryBus.ask<GetTimeSeriesResponse>(query);
    const response = successResponse(result.timeSeries, StatusCodes.OK);
    res.status(response.status.httpStatusCode).json(response);
  };
}
