import { Controller } from '@Components/Shared/infrastructure/web/Controller';
import { successResponse } from '@Components/Shared/infrastructure/web/responses/success-response';
import { Request, Response } from 'express';
import { inject, injectable } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import sharedDiIdentifiers from '@Components/Shared/infrastructure/di-identifiers';
import { QueryBus } from '@Components/Shared/domain/query-bus';
import { GetAggregateValueQuery } from '@Components/Metrics/application/get-aggregate-value/get-aggregate-value.query';
import { GetAggregateValueResponse } from '@Components/Metrics/application/get-aggregate-value/get-aggregate-value.response';

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
