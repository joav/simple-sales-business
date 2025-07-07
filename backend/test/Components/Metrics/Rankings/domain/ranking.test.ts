import { Category, INVALID_CATEGORY } from "@Metrics/Shared/domain";
import { Ranking, RANKING_EXCEPTIONS, RankingBuilder, RANKING_COMPETITOR_EXCEPTIONS } from "@Metrics/Rankings/domain";
import { InvalidInputException } from "@Shared/domain";

describe('Metrics Ranking', () => {
  it('should create from primitives', () => {
    const values = {
      rankingSlug: 'some-ranking',
      rankingValueTitle: 'Some Ranking Value',
      category: 'products'
    };
    const ranking = Ranking.fromPrimitives(values);

    expect(ranking).toBeTruthy();
    expect(ranking.rankingSlug).toBe('some-ranking');
    expect(ranking.rankingValueTitle).toBe('Some Ranking Value');
    expect(ranking.category).toBe(Category.PRODUCTS);
    expect(ranking.toPrimitives()).toEqual(values);
  });
  it('should throws InvalidInputException for invalid rankingSlug', () => {
    try {
      Ranking.fromPrimitives({} as any);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputException);
      expect(error.status.statusCode).toBe(RANKING_EXCEPTIONS.InvalidRankingSlug.statusCode);
      expect(error.status.statusMessage).toBe(RANKING_EXCEPTIONS.InvalidRankingSlug.statusMessage);
    }
  });
  it('should throws InvalidInputException for invalid rankingValueTitle', () => {
    try {
      Ranking.fromPrimitives({rankingSlug: 'slug'} as any);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputException);
      expect(error.status.statusCode).toBe(RANKING_EXCEPTIONS.InvalidRankingValueTitle.statusCode);
      expect(error.status.statusMessage).toBe(RANKING_EXCEPTIONS.InvalidRankingValueTitle.statusMessage);
    }
  });
  it('should throws InvalidInputException for empty category', () => {
    try {
      Ranking.fromPrimitives({
        rankingSlug: 'some-ranking',
        rankingValueTitle: 'Title'
      } as any);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputException);
      expect(error.status.statusCode).toBe(INVALID_CATEGORY.statusCode);
      expect(error.status.statusMessage).toBe(INVALID_CATEGORY.statusMessage);
    }
  });
  it('should throws InvalidInputException for invalid category', () => {
    try {
      Ranking.fromPrimitives({
        rankingSlug: 'some-ranking',
        rankingValueTitle: 'Title',
        category: 'invalid-category'
      } as any);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputException);
      expect(error.status.statusCode).toBe(INVALID_CATEGORY.statusCode);
      expect(error.status.statusMessage).toBe(INVALID_CATEGORY.statusMessage);
    }
  });
  describe('RankingBuilder', () => {
    let builder: RankingBuilder;
    beforeEach(() => {
      builder = new RankingBuilder;
    });
    it('should build with all params', () => {
      const lastUpdate = new Date();
      const ranking = builder
        .withRankingSlug('some-slug')
        .withRankingValueTitle('Title')
        .withCategory('sales')
        .withData([{
          name: 'Name',
          lastUpdate: lastUpdate.toISOString(),
          value: 4
        }])
        .build();
      expect(ranking).toBeDefined();
      expect(ranking.rankingSlug).toBeTruthy();
      expect(ranking.rankingValueTitle).toBeTruthy();
      expect(ranking.category).toBeTruthy();
      expect(ranking.data).toBeDefined();
      expect(ranking.data[0].name).toEqual("Name");
      expect(ranking.data[0].lastUpdate).toEqual(lastUpdate);
      expect(ranking.data[0].value).toEqual(4);
      expect(ranking.toPrimitives()).toBeDefined();
    });
    it('should throws InvalidInputException for empty data name', () => {
      try {
        builder
          .withRankingSlug('some-slug')
          .withRankingValueTitle('Title')
          .withCategory('sales')
          .withData([{
            name: ''
          } as any])
          .build();
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidInputException);
        expect(error.status.statusCode).toBe(RANKING_COMPETITOR_EXCEPTIONS.InvalidName.statusCode);
        expect(error.status.statusMessage).toBe(RANKING_COMPETITOR_EXCEPTIONS.InvalidName.statusMessage);
      }
    });
    it('should throws InvalidInputException for empty data lastUpdate', () => {
      try {
        builder
          .withRankingSlug('some-slug')
          .withRankingValueTitle('Title')
          .withCategory('sales')
          .withData([{
            name: 'Fake Competitor',
            lastUpdate: ''
          } as any])
          .build();
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidInputException);
        expect(error.status.statusCode).toBe(RANKING_COMPETITOR_EXCEPTIONS.InvalidLastUpdate.statusCode);
        expect(error.status.statusMessage).toBe(RANKING_COMPETITOR_EXCEPTIONS.InvalidLastUpdate.statusMessage);
      }
    });
    it('should throws InvalidInputException for invalid data lastUpdate', () => {
      try {
        builder
          .withRankingSlug('some-slug')
          .withRankingValueTitle('Title')
          .withCategory('sales')
          .withData([{
            name: 'Fake Competitor',
            lastUpdate: 'fake fake'
          } as any])
          .build();
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidInputException);
        expect(error.status.statusCode).toBe(RANKING_COMPETITOR_EXCEPTIONS.InvalidLastUpdate.statusCode);
        expect(error.status.statusMessage).toBe(RANKING_COMPETITOR_EXCEPTIONS.InvalidLastUpdate.statusMessage);
      }
    });
    it('should throws InvalidInputException for invalid data lastUpdate format', () => {
      try {
        builder
          .withRankingSlug('some-slug')
          .withRankingValueTitle('Title')
          .withCategory('sales')
          .withData([{
            name: 'Fake Competitor',
            lastUpdate: '2025-06-21'
          } as any])
          .build();
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidInputException);
        expect(error.status.statusCode).toBe(RANKING_COMPETITOR_EXCEPTIONS.InvalidLastUpdate.statusCode);
        expect(error.status.statusMessage).toBe(RANKING_COMPETITOR_EXCEPTIONS.InvalidLastUpdate.statusMessage);
      }
    });
    it('should throws InvalidInputException for empty data value', () => {
      try {
        builder
          .withRankingSlug('some-slug')
          .withRankingValueTitle('Title')
          .withCategory('sales')
          .withData([{
            name: 'Fake Competitor',
            lastUpdate: '2025-06-21T04:02:02.060Z'
          } as any])
          .build();
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidInputException);
        expect(error.status.statusCode).toBe(RANKING_COMPETITOR_EXCEPTIONS.InvalidValue.statusCode);
        expect(error.status.statusMessage).toBe(RANKING_COMPETITOR_EXCEPTIONS.InvalidValue.statusMessage);
      }
    });
    it('should throws InvalidInputException for invalid data value', () => {
      try {
        builder
          .withRankingSlug('some-slug')
          .withRankingValueTitle('Title')
          .withCategory('sales')
          .withData([{
            name: 'Fake Competitor',
            lastUpdate: '2025-06-21T04:02:02.060Z',
            value: NaN
          }])
          .build();
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidInputException);
        expect(error.status.statusCode).toBe(RANKING_COMPETITOR_EXCEPTIONS.InvalidValue.statusCode);
        expect(error.status.statusMessage).toBe(RANKING_COMPETITOR_EXCEPTIONS.InvalidValue.statusMessage);
      }
    });
  });
});
