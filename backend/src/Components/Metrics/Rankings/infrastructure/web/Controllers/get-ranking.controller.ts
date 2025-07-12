import { Request, Response } from 'express';
import { inject, injectable, named } from 'inversify';
import { StatusCodes } from 'http-status-codes';
import { GetRankingQuery, GetRankingResponse } from '@Metrics/Rankings/application';
import { QueryBus, ApplicationLogger } from '@Shared/domain';
import { Controller, sharedDiIdentifiers, successResponse } from '@Shared/infrastructure';
import { LOGGER } from '../../logger';

@injectable('Singleton')
export class GetRankingController implements Controller {
  constructor(
    @inject(sharedDiIdentifiers.QUERY_BUS) private queryBus: QueryBus,
    @inject(sharedDiIdentifiers.LOGGER) @named(LOGGER) private logger: ApplicationLogger
  ) {}

  handleRequest = async (req: Request, res: Response) => {
    this.logger.info('Processing GetRankingController...');
    this.logger.debug('Params', { params: req.params });
    this.logger.debug('Http Query', { query: req.query });
    const query = new GetRankingQuery(
      req.params.category,
      req.params.rankingSlug,
      Number(req.query.top ?? 0)
    );
    const result = await this.queryBus.ask<GetRankingResponse>(query);
    const response = successResponse(result.ranking, StatusCodes.OK);
    this.logger.debug('Response', { response });
    this.logger.info('GetRankingController processed');
    res.status(response.status.httpStatusCode).json(response);
  };
}
