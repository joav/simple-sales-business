import { Request, Response } from 'express';
import { inject, injectable, named } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { GetAggregateValueQuery, GetAggregateValueResponse } from '@Metrics/Aggregates/application';
import { ApplicationLogger, QueryBus } from '@Shared/domain';
import { Controller, sharedDiIdentifiers, successResponse } from '@Shared/infrastructure';
import { LOGGER } from '../../logger';

@injectable('Singleton')
export class GetAggregateValueController implements Controller {
  constructor(
    @inject(sharedDiIdentifiers.QUERY_BUS) private queryBus: QueryBus,
    @inject(sharedDiIdentifiers.LOGGER) @named(LOGGER) private logger: ApplicationLogger
  ) {}

  handleRequest = async (req: Request, res: Response) => {
    this.logger.info('GetAggregateValueController processing request...');
    this.logger.debug('GetAggregateValueController params', { params: req.params });
    const query = new GetAggregateValueQuery(req.params.category, req.params.aggregateId);
    const result = await this.queryBus.ask<GetAggregateValueResponse>(query);
    const response = successResponse(result.aggregateValue, StatusCodes.OK);
    this.logger.debug('GetAggregateValueController response', { response });
    this.logger.info('GetAggregateValueController processed');
    res.status(response.status.httpStatusCode).json(response);
  };
}
