import { Request, Response } from 'express';
import { inject, injectable, named } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { GetTimeSerieQuery, GetTimeSerieResponse } from '@Metrics/TimeSeries/application';
import { QueryBus, ApplicationLogger } from '@Shared/domain';
import { Controller, sharedDiIdentifiers, successResponse } from '@Shared/infrastructure';
import { LOGGER } from '../../logger';

@injectable('Singleton')
export class GetTimeSerieController implements Controller {
  constructor(
    @inject(sharedDiIdentifiers.QUERY_BUS) private queryBus: QueryBus,
    @inject(sharedDiIdentifiers.LOGGER) @named(LOGGER) private logger: ApplicationLogger
  ) {}

  handleRequest = async (req: Request, res: Response) => {
    this.logger.info('Processing GetTimeSerieController request...');
    this.logger.debug('params', { params: req.params });
    const query = new GetTimeSerieQuery(req.params.category, req.params.timeSerieSlug);
    const result = await this.queryBus.ask<GetTimeSerieResponse>(query);
    const response = successResponse(result.timeSerie, StatusCodes.OK);
    this.logger.debug('response', { response });
    this.logger.info('GetTimeSerieController request processed');
    res.status(response.status.httpStatusCode).json(response);
  };
}
