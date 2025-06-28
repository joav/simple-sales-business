import { Category, INVALID_CATEGORY } from "@Metrics/Shared/domain";
import { Ranking, RANKING_EXCEPTIONS } from "@Metrics/Rankings/domain";
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
});
