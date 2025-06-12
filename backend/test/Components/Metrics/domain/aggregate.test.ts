import { Aggregate } from "@Components/Metrics/domain/aggregate";
import { AggregateFn } from "@Components/Metrics/domain/aggregate-fn";
import { Category } from "@Components/Metrics/domain/category";

describe('Metrics Aggregate', () => {
  it('should create from primitives', () => {
    const aggregate = Aggregate.fromPrimitives({
      aggregateId: 'some-count',
      category: 'products',
      aggregateFn: 'RECOUNT'
    });

    expect(aggregate).toBeTruthy();
    expect(aggregate.aggregateId).toBe('some-count');
    expect(aggregate.category).toBe(Category.PRODUCTS);
    expect(aggregate.aggregateFn).toBe(AggregateFn.RECOUNT);
  });
  it('should throws InvalidInputException for invalid aggregateId', () => {
    try {
      Aggregate.fromPrimitives({} as any);
    } catch (error) {
      expect(error).toBeInstanceOf(Error);
    }
  });
});
