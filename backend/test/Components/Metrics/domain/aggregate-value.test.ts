import { AggregateValue, AGGREGATE_VALUE_EXCEPTIONS } from "@Components/Metrics/domain/aggregate-value";
import { AggregateFn } from "@Components/Metrics/domain/aggregate-fn";
import { Category } from "@Components/Metrics/domain/category";
import { InvalidInputException } from "@Components/Shared/domain/exceptions/invalid-input.exception";

describe('Metrics AggregateValue', () => {
  it('should create from primitives', () => {
    const values = {
      aggregateId: 'some-count',
      category: 'products',
      aggregateFn: 'RECOUNT',
      aggregateValue: 5,
      lastUpdate: (new Date).toISOString()
    };
    const aggregateValue = AggregateValue.fromPrimitives(values);

    expect(aggregateValue).toBeTruthy();
    expect(aggregateValue.aggregateId).toBe('some-count');
    expect(aggregateValue.category).toBe(Category.PRODUCTS);
    expect(aggregateValue.aggregateFn).toBe(AggregateFn.RECOUNT);
    expect(aggregateValue.lastUpdate.constructor).toBe(Date);
    expect(aggregateValue.toPrimitives()).toEqual(values);
  });
  it('should throws InvalidInputException for empty aggregateValue', () => {
    try {
      AggregateValue.fromPrimitives({
        aggregateId: 'some-count',
        category: 'products',
        aggregateFn: 'RECOUNT'
      } as any);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputException);
      expect(error.status.statusCode).toBe(AGGREGATE_VALUE_EXCEPTIONS.InvalidAggregateValue.statusCode);
      expect(error.status.statusMessage).toBe(AGGREGATE_VALUE_EXCEPTIONS.InvalidAggregateValue.statusMessage);
    }
  });
  it('should throws InvalidInputException for invalid aggregateValue', () => {
    try {
      AggregateValue.fromPrimitives({
        aggregateId: 'some-count',
        category: 'products',
        aggregateFn: 'RECOUNT',
        aggregateValue: NaN
      } as any);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputException);
      expect(error.status.statusCode).toBe(AGGREGATE_VALUE_EXCEPTIONS.InvalidAggregateValue.statusCode);
      expect(error.status.statusMessage).toBe(AGGREGATE_VALUE_EXCEPTIONS.InvalidAggregateValue.statusMessage);
    }
  });
  it('should throws InvalidInputException for empty lastUpdate', () => {
    try {
      AggregateValue.fromPrimitives({
        aggregateId: 'some-count',
        category: 'products',
        aggregateFn: 'RECOUNT',
        aggregateValue: 5
      } as any);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputException);
      expect(error.status.statusCode).toBe(AGGREGATE_VALUE_EXCEPTIONS.InvalidLastUpdate.statusCode);
      expect(error.status.statusMessage).toBe(AGGREGATE_VALUE_EXCEPTIONS.InvalidLastUpdate.statusMessage);
    }
  });
  it('should throws InvalidInputException for invalid lastUpdate', () => {
    try {
      AggregateValue.fromPrimitives({
        aggregateId: 'some-count',
        category: 'products',
        aggregateFn: 'RECOUNT',
        aggregateValue: 5,
        lastUpdate: 'fake date'
      } as any);
    } catch (error) {
      expect(error).toBeInstanceOf(InvalidInputException);
      expect(error.status.statusCode).toBe(AGGREGATE_VALUE_EXCEPTIONS.InvalidLastUpdate.statusCode);
      expect(error.status.statusMessage).toBe(AGGREGATE_VALUE_EXCEPTIONS.InvalidLastUpdate.statusMessage);
    }
  });
});