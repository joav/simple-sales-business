import { Controller } from '@Components/Shared/infrastructure/web/Controller';
import { successResponse } from '@Components/Shared/infrastructure/web/responses/success-response';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import sharedDiIdentifiers from '@Components/Shared/infrastructure/di-identifiers';
import { QueryBus } from '@Components/Shared/domain/query-bus';
import { GetAggregatesQuery, GetAggregatesResponse } from '@Metrics/Aggregates/application';

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
