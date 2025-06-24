import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { GetAggregateValueQuery, GetAggregateValueResponse } from '@Metrics/Aggregates/application';
import { QueryBus } from '@Shared/domain';
import { Controller, sharedDiIdentifiers, successResponse } from '@Shared/infrastructure';

@injectable('Singleton')
export class GetAggregateValueController implements Controller {
  constructor(@inject(sharedDiIdentifiers.QUERY_BUS) private queryBus: QueryBus) {}

  handleRequest = async (req: Request, res: Response) => {
    const query = new GetAggregateValueQuery(req.params.category, req.params.aggregateId);
    const result = await this.queryBus.ask<GetAggregateValueResponse>(query);
    const response = successResponse(result.aggregateValue, StatusCodes.OK);
    res.status(response.status.httpStatusCode).json(response);
  };
}
