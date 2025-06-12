import { AggregateFn } from "./aggregate-fn";
import { Category } from "./category";
import { isAggregateFn } from "./is-aggregate-fn";
import { isCategory } from "./is-category";

export class Aggregate {
  private constructor(
    public readonly aggregateId: string,
    public readonly category: Category,
    public readonly aggregateFn: AggregateFn
  ) { }
  static fromPrimitives(values: {
    aggregateId: string,
    category: string,
    aggregateFn: string
  }) {
    const aggregateId = Aggregate.verifyAggregateId(values.aggregateId);
    const category = Aggregate.verifyCategory(values.category);
    const aggregateFn = Aggregate.verifyAggregateFn(values.aggregateFn);
    return new Aggregate(
      aggregateId,
      category,
      aggregateFn
    );
  }

  private static verifyAggregateId(aggregateId: string): string {
    if (!aggregateId) throw new Error();
    return aggregateId;
  }

  private static verifyCategory(category: string): Category {
    if (!isCategory(category)) throw new Error();
    return category;
  }

  private static verifyAggregateFn(aggregateFn: string): AggregateFn {
    if (!isAggregateFn(aggregateFn)) throw new Error();
    return aggregateFn;
  }
}
