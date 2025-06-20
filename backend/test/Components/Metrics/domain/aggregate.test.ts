import { Aggregate, AGGREGATE_EXCEPTIONS } from "@Components/Metrics/domain/aggregate";
import { AggregateFn } from "@Components/Metrics/domain/aggregate-fn";
import { Category } from "@Components/Metrics/domain/category";
import { INVALID_CATEGORY } from "@Components/Metrics/domain/category-from-primitive";
import { InvalidInputException } from "@Components/Shared/domain/exceptions/invalid-input.exception";

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
