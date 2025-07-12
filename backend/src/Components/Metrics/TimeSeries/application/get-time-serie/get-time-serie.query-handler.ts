import { QueryHandler, ApplicationLogger, InvalidInputException } from '@Shared/domain';
import { categoryFromPrimitive, strOrEmptyStrToDateOrError } from '@Metrics/Shared/domain';
import { GetTimeSerieQuery } from './get-time-serie.query';
import { GetTimeSerieResponse } from './get-time-serie.response';
import { TimeSerieGetter } from './time-serie-getter';

export const GET_TIME_SERIE_EXCEPTIONS = {
  InvalidFromDate: {
    statusCode: 3100,
    statusMessage: 'Metrics:Application:GetTimeSerie:InvalidFromDate'
  },
  InvalidToDate: {
    statusCode: 3101,
    statusMessage: 'Metrics:Application:GetTimeSerie:InvalidToDate'
  }
};

export class GetTimeSerieQueryHandler
  implements QueryHandler<GetTimeSerieQuery, GetTimeSerieResponse>
{
  constructor(
    private getter: TimeSerieGetter,
    private logger: ApplicationLogger
  ) {}
  async handle(query: GetTimeSerieQuery) {
    this.logger.info('Processing GetTimeSerieQuery...');
    this.logger.debug('Query', { query });
    const category = categoryFromPrimitive(query.category);
    const from = strOrEmptyStrToDateOrError(
      query.from,
      GetTimeSerieQueryHandler.fromDateErrorFactory
    );
    const to = strOrEmptyStrToDateOrError(query.to, GetTimeSerieQueryHandler.toDateErrorFactory);
    const timeSerie = await this.getter.run(category, query.timeSerieSlug, from, to);
    this.logger.debug('timeSerie', { timeSerie });
    this.logger.info('GetTimeSerieQuery processed');
    return new GetTimeSerieResponse(timeSerie);
  }
  subscribedTo() {
    return GetTimeSerieQuery;
  }
  private static fromDateErrorFactory() {
    return InvalidInputException.fromStatusParams(GET_TIME_SERIE_EXCEPTIONS.InvalidFromDate);
  }
  private static toDateErrorFactory() {
    return InvalidInputException.fromStatusParams(GET_TIME_SERIE_EXCEPTIONS.InvalidToDate);
  }
}
