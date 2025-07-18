import { GetRankingQuery, GetRankingQueryHandler, RankingGetter, GET_RANKING_EXCEPTIONS } from '@Metrics/Rankings/application';
import { Ranking } from '@Metrics/Rankings/domain';
import { getLogger } from '@Shared/infrastructure';
import { configLogger, LOGGER } from '@Metrics/Rankings/infrastructure'; 
import { ApplicationLogger, InvalidInputException } from '@Shared/domain';

const values = { rankingSlug: 'some', rankingValueTitle:'Title', category: 'products', data: [{ id: 'FAKE', name: 'Name', value: 5, lastUpdate: '2025-06-21T08:09:06.060Z' }] };

describe('Get Ranking', () => {
  let handler: GetRankingQueryHandler;
  let logger: ApplicationLogger;
  beforeAll(() => {
    configLogger();
    logger = getLogger(LOGGER);
  });
  beforeEach(() => {
    const repo: any = {
      get: () => Promise.resolve(Ranking.fromPrimitives(values))
    };
    const getter = new RankingGetter(repo);
    handler = new GetRankingQueryHandler(getter, logger);
  });
  it('should handle query and get response', async () => {
    const top = 3;
    const query = new GetRankingQuery(values.category, values.rankingSlug, top);

    const result = await handler.handle(query);
    expect(result.ranking).toBeTruthy();
    expect(result.ranking).toEqual(values);
  });
  it('should throws InvalidInputException for invalid top', async () => {
    try {
      const top = NaN;
      const query = new GetRankingQuery(values.category, values.rankingSlug, top);
      await handler.handle(query);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputException);
      expect(error.status.statusCode).toBe(GET_RANKING_EXCEPTIONS.InvalidTop.statusCode);
      expect(error.status.statusMessage).toBe(GET_RANKING_EXCEPTIONS.InvalidTop.statusMessage);
    }
  });
});
