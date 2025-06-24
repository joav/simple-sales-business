import { Category, INVALID_CATEGORY } from "@Metrics/Shared/domain";
import { TimeSerie, TIME_SERIE_EXCEPTIONS } from "@Metrics/TimeSeries/domain";
import { InvalidInputException } from "@Shared/domain";

describe('Metrics TimeSeries', () => {
  it('should create from primitives', () => {
    const values = {
      timeSerieSlug: 'some-time-serie',
      category: 'products'
    };
    const timeSerie = TimeSerie.fromPrimitives(values);

    expect(timeSerie).toBeTruthy();
    expect(timeSerie.timeSerieSlug).toBe('some-time-serie');
    expect(timeSerie.category).toBe(Category.PRODUCTS);
    expect(timeSerie.toPrimitives()).toEqual(values);
  });
  it('should throws InvalidInputException for invalid timeSerieSlug', () => {
    try {
      TimeSerie.fromPrimitives({} as any);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputException);
      expect(error.status.statusCode).toBe(TIME_SERIE_EXCEPTIONS.InvalidTimeSerieSlug.statusCode);
      expect(error.status.statusMessage).toBe(TIME_SERIE_EXCEPTIONS.InvalidTimeSerieSlug.statusMessage);
    }
  });
  it('should throws InvalidInputException for empty category', () => {
    try {
      TimeSerie.fromPrimitives({
        timeSerieSlug: 'some-time-serie'
      } as any);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputException);
      expect(error.status.statusCode).toBe(INVALID_CATEGORY.statusCode);
      expect(error.status.statusMessage).toBe(INVALID_CATEGORY.statusMessage);
    }
  });
  it('should throws InvalidInputException for invalid category', () => {
    try {
      TimeSerie.fromPrimitives({
        timeSerieSlug: 'some-time-serie',
        category: 'invalid-category'
      } as any);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputException);
      expect(error.status.statusCode).toBe(INVALID_CATEGORY.statusCode);
      expect(error.status.statusMessage).toBe(INVALID_CATEGORY.statusMessage);
    }
  });
});
