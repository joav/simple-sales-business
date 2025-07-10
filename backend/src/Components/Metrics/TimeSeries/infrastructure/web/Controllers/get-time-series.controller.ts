import { Request, Response } from 'express';
import { inject, injectable, named } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { QueryBus, ApplicationLogger } from '@Shared/domain';
import { Controller, sharedDiIdentifiers, successResponse } from '@Shared/infrastructure';
import { GetTimeSeriesQuery, GetTimeSeriesResponse } from '@Metrics/TimeSeries/application';
import { LOGGER } from '../../logger';

@injectable('Singleton')
export class GetTimeSeriesController implements Controller {
  constructor(
    @inject(sharedDiIdentifiers.QUERY_BUS) private queryBus: QueryBus,
    @inject(sharedDiIdentifiers.LOGGER) @named(LOGGER) private logger: ApplicationLogger
  ) {}

  handleRequest = async (req: Request, res: Response) => {
    this.logger.info('Processing GetTimeSeriesController request...');
    this.logger.debug('params', { params: req.params });
    const query = new GetTimeSeriesQuery(req.params.category);
    const result = await this.queryBus.ask<GetTimeSeriesResponse>(query);
    const response = successResponse(result.timeSeries, StatusCodes.OK);
    this.logger.debug('response', { response });
    this.logger.info('GetTimeSeriesController request processed');
    res.status(response.status.httpStatusCode).json(response);
  };
}
