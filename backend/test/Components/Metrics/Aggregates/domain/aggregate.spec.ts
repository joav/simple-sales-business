import { AggregateFn, Aggregate, AGGREGATE_EXCEPTIONS } from "@Metrics/Aggregates/domain";
import { Category, INVALID_CATEGORY } from "@Metrics/Shared/domain";
import { InvalidInputException } from "@Shared/domain";

describe('Metrics Aggregate', () => {
  it('should create from primitives', () => {
    const values = {
      aggregateId: 'some-count',
      category: 'products',
      aggregateFn: 'RECOUNT'
    };
    const aggregate = Aggregate.fromPrimitives(values);

    expect(aggregate).toBeTruthy();
    expect(aggregate.aggregateId).toBe('some-count');
    expect(aggregate.category).toBe(Category.PRODUCTS);
    expect(aggregate.aggregateFn).toBe(AggregateFn.RECOUNT);
    expect(aggregate.toPrimitives()).toEqual(values);
  });
  it('should throws InvalidInputException for invalid aggregateId', () => {
    try {
      Aggregate.fromPrimitives({} as any);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputException);
      expect(error.status.statusCode).toBe(AGGREGATE_EXCEPTIONS.InvalidAggregateId.statusCode);
      expect(error.status.statusMessage).toBe(AGGREGATE_EXCEPTIONS.InvalidAggregateId.statusMessage);
    }
  });
  it('should throws InvalidInputException for empty category', () => {
    try {
      Aggregate.fromPrimitives({
        aggregateId: 'some-count'
      } as any);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputException);
      expect(error.status.statusCode).toBe(INVALID_CATEGORY.statusCode);
      expect(error.status.statusMessage).toBe(INVALID_CATEGORY.statusMessage);
    }
  });
  it('should throws InvalidInputException for invalid category', () => {
    try {
      Aggregate.fromPrimitives({
        aggregateId: 'some-count',
        category: 'invalid-category'
      } as any);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputException);
      expect(error.status.statusCode).toBe(INVALID_CATEGORY.statusCode);
      expect(error.status.statusMessage).toBe(INVALID_CATEGORY.statusMessage);
    }
  });
  it('should throws InvalidInputException for empty aggregateFn', () => {
    try {
      Aggregate.fromPrimitives({
        aggregateId: 'some-count',
        category: 'products'
      } as any);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputException);
      expect(error.status.statusCode).toBe(AGGREGATE_EXCEPTIONS.InvalidAggregateFn.statusCode);
      expect(error.status.statusMessage).toBe(AGGREGATE_EXCEPTIONS.InvalidAggregateFn.statusMessage);
    }
  });
  it('should throws InvalidInputException for invalid aggregateFn', () => {
    try {
      Aggregate.fromPrimitives({
        aggregateId: 'some-count',
        category: 'products',
        aggregateFn: 'invalid-fn'
      });
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputException);
      expect(error.status.statusCode).toBe(AGGREGATE_EXCEPTIONS.InvalidAggregateFn.statusCode);
      expect(error.status.statusMessage).toBe(AGGREGATE_EXCEPTIONS.InvalidAggregateFn.statusMessage);
    }
  });
});
