import { GetTimeSerieQuery, GetTimeSerieQueryHandler, TimeSerieGetter, GET_TIME_SERIE_EXCEPTIONS } from '@Metrics/TimeSeries/application';
import { TimeSerie } from '@Metrics/TimeSeries/domain';
import { LOGGER, configLogger } from '@Metrics/TimeSeries/infrastructure';
import { getLogger } from '@Shared/infrastructure';
import { ApplicationLogger, InvalidInputException } from '@Shared/domain';

const values = { timeSerieSlug: 'some', category: 'products', data: [{ value: 5, date: '2025-06-21T08:09:06.060Z' }] };

describe('Get TimeSerie', () => {
  let handler: GetTimeSerieQueryHandler;
  let logger: ApplicationLogger;
  beforeAll(() => {
    configLogger();
    logger = getLogger(LOGGER);
  });
  beforeEach(() => {
    const repo: any = {
      get: () => Promise.resolve(TimeSerie.fromPrimitives(values))
    };
    const getter = new TimeSerieGetter(repo);
    handler = new GetTimeSerieQueryHandler(getter, logger);
  });
  it('should handle query and get response', async () => {
    const query = new GetTimeSerieQuery(values.category, values.timeSerieSlug, values.data[0].date, values.data[0].date);

    const result = await handler.handle(query);
    expect(result.timeSerie).toBeTruthy();
    expect(result.timeSerie).toEqual(values);
  });
  it('should throws InvalidInputException for invalid from date', async () => {
    try {
      const query = new GetTimeSerieQuery(values.category, values.timeSerieSlug, '', values.data[0].date);
      await handler.handle(query);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputException);
      expect(error.status.statusCode).toBe(GET_TIME_SERIE_EXCEPTIONS.InvalidFromDate.statusCode);
      expect(error.status.statusMessage).toBe(GET_TIME_SERIE_EXCEPTIONS.InvalidFromDate.statusMessage);
    }
  });
  it('should throws InvalidInputException for invalid to date', async () => {
    try {
      const query = new GetTimeSerieQuery(values.category, values.timeSerieSlug, values.data[0].date, '');
      const result = await handler.handle(query);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputException);
      expect(error.status.statusCode).toBe(GET_TIME_SERIE_EXCEPTIONS.InvalidToDate.statusCode);
      expect(error.status.statusMessage).toBe(GET_TIME_SERIE_EXCEPTIONS.InvalidToDate.statusMessage);
    }
  });
});
