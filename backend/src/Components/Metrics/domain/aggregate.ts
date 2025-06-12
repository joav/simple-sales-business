import { AggregateFn } from './aggregate-fn';
import { Category } from './category';

export class Aggregate {
  private constructor(
    public readonly aggregateId: string,
    public readonly category: Category,
    public readonly aggregateFn: AggregateFn
  ) {}
  static fromPrimitives(values: { aggregateId: string; category: string; aggregateFn: string }) {
    const aggregateId = Aggregate.verifyAggregateId(values.aggregateId);
    const category = Aggregate.verifyCategory(values.category);
    const aggregateFn = Aggregate.verifyAggregateFn(values.aggregateFn);
    return new Aggregate(aggregateId, category, aggregateFn);
  }

  private static verifyAggregateId(aggregateId: string): string {
    return aggregateId;
  }

  private static verifyCategory(category: string): Category {
    return category as Category;
  }

  private static verifyAggregateFn(aggregateFn: string): AggregateFn {
    return aggregateFn as AggregateFn;
  }
}
