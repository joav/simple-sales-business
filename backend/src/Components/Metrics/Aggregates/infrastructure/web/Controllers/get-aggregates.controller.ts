import { Request, Response } from 'express';
import { inject, injectable, named } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { GetAggregatesQuery, GetAggregatesResponse } from '@Metrics/Aggregates/application';
import { ApplicationLogger, QueryBus } from '@Shared/domain';
import { Controller, sharedDiIdentifiers, successResponse } from '@Shared/infrastructure';
import { LOGGER } from '../../logger';

@injectable('Singleton')
export class GetAggregatesController implements Controller {
  constructor(
    @inject(sharedDiIdentifiers.QUERY_BUS) private queryBus: QueryBus,
    @inject(sharedDiIdentifiers.LOGGER) @named(LOGGER) private logger: ApplicationLogger
  ) {}

  handleRequest = async (req: Request, res: Response) => {
    this.logger.info('GetAggregatesController processing request...');
    this.logger.debug('GetAggregatesController params', { params: req.params });
    const query = new GetAggregatesQuery(req.params.category);
    const result = await this.queryBus.ask<GetAggregatesResponse>(query);
    const response = successResponse(result.aggregates, StatusCodes.OK);
    this.logger.debug('GetAggregatesController response', { response });
    this.logger.info('GetAggregatesController processed');
    res.status(response.status.httpStatusCode).json(response);
  };
}
