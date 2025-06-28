import { Category, INVALID_CATEGORY } from "@Metrics/Shared/domain";
import { TimeSerie, TIME_SERIE_EXCEPTIONS, TimeSerieBuilder, DATA_VALUE_EXCEPTIONS } from "@Metrics/TimeSeries/domain";
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
  describe('TimeSerieBuilder', () => {
    let builder: TimeSerieBuilder;
    beforeEach(() => {
      builder = new TimeSerieBuilder;
    });
    it('should build with all params', () => {
      const date = new Date();
      const timeSerie = builder
        .withTimeSerieSlug('some-slug')
        .withCategory('sales')
        .withData([{
          date: date.toISOString(),
          value: 4
        }])
        .build();
      expect(timeSerie).toBeDefined();
      expect(timeSerie.timeSerieSlug).toBeTruthy();
      expect(timeSerie.category).toBeTruthy();
      expect(timeSerie.data).toBeDefined();
      expect(timeSerie.data[0].date).toEqual(date);
      expect(timeSerie.data[0].value).toEqual(4);
      expect(timeSerie.toPrimitives()).toBeDefined();
    });
    it('should throws InvalidInputException for empty data date', () => {
      try {
        builder
          .withTimeSerieSlug('some-slug')
          .withCategory('sales')
          .withData([{
            date: ''
          } as any])
          .build();
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidInputException);
        expect(error.status.statusCode).toBe(DATA_VALUE_EXCEPTIONS.InvalidDate.statusCode);
        expect(error.status.statusMessage).toBe(DATA_VALUE_EXCEPTIONS.InvalidDate.statusMessage);
      }
    });
    it('should throws InvalidInputException for invalid data date', () => {
      try {
        builder
          .withTimeSerieSlug('some-slug')
          .withCategory('sales')
          .withData([{
            date: 'fake fake'
          } as any])
          .build();
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidInputException);
        expect(error.status.statusCode).toBe(DATA_VALUE_EXCEPTIONS.InvalidDate.statusCode);
        expect(error.status.statusMessage).toBe(DATA_VALUE_EXCEPTIONS.InvalidDate.statusMessage);
      }
    });
    it('should throws InvalidInputException for invalid data date format', () => {
      try {
        builder
          .withTimeSerieSlug('some-slug')
          .withCategory('sales')
          .withData([{
            date: '2025-06-21'
          } as any])
          .build();
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidInputException);
        expect(error.status.statusCode).toBe(DATA_VALUE_EXCEPTIONS.InvalidDate.statusCode);
        expect(error.status.statusMessage).toBe(DATA_VALUE_EXCEPTIONS.InvalidDate.statusMessage);
      }
    });
    it('should throws InvalidInputException for empty data value', () => {
      try {
        builder
          .withTimeSerieSlug('some-slug')
          .withCategory('sales')
          .withData([{
            date: '2025-06-21T04:02:02.060Z'
          } as any])
          .build();
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidInputException);
        expect(error.status.statusCode).toBe(DATA_VALUE_EXCEPTIONS.InvalidValue.statusCode);
        expect(error.status.statusMessage).toBe(DATA_VALUE_EXCEPTIONS.InvalidValue.statusMessage);
      }
    });
    it('should throws InvalidInputException for invalid data value', () => {
      try {
        builder
          .withTimeSerieSlug('some-slug')
          .withCategory('sales')
          .withData([{
            date: '2025-06-21T04:02:02.060Z',
            value: NaN
          }])
          .build();
      } catch (error) {
        expect(error).toBeInstanceOf(InvalidInputException);
        expect(error.status.statusCode).toBe(DATA_VALUE_EXCEPTIONS.InvalidValue.statusCode);
        expect(error.status.statusMessage).toBe(DATA_VALUE_EXCEPTIONS.InvalidValue.statusMessage);
      }
    });
  });
});
