import { Request, Response } from 'express';
import { inject, injectable, named } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { QueryBus, ApplicationLogger } from '@Shared/domain';
import { Controller, sharedDiIdentifiers, successResponse } from '@Shared/infrastructure';
import { GetRankingsQuery, GetRankingsResponse } from '@Metrics/Rankings/application';
import { LOGGER } from '../../logger';

@injectable('Singleton')
export class GetRankingsController implements Controller {
  constructor(
    @inject(sharedDiIdentifiers.QUERY_BUS) private queryBus: QueryBus,
    @inject(sharedDiIdentifiers.LOGGER) @named(LOGGER) private logger: ApplicationLogger
  ) {}

  handleRequest = async (req: Request, res: Response) => {
    this.logger.info('Processing GetRankingsController...');
    this.logger.debug('Params', { params: req.params });
    const query = new GetRankingsQuery(req.params.category);
    const result = await this.queryBus.ask<GetRankingsResponse>(query);
    const response = successResponse(result.rankings, StatusCodes.OK);
    this.logger.debug('Response', { response });
    this.logger.info('GetRankingsController processed');
    res.status(response.status.httpStatusCode).json(response);
  };
}
