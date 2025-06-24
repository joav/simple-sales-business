import { InvalidInputException } from '@Components/Shared/domain/exceptions/invalid-input.exception';
import { Category, categoryFromPrimitive } from '@Metrics/Shared/domain';
import { AggregateFn } from './aggregate-fn';
import { isAggregateFn } from './is-aggregate-fn';

export const AGGREGATE_EXCEPTIONS = {
  InvalidAggregateId: {
    statusCode: 1000,
    statusMessage: 'Metrics:Domain:Aggregate:InvalidAggregateId'
  },
  InvalidAggregateFn: {
    statusCode: 1002,
    statusMessage: 'Metrics:Domain:Aggregate:InvalidAggregateFn'
  }
};

export class Aggregate {
  protected constructor(
    public readonly aggregateId: string,
    public readonly category: Category,
    public readonly aggregateFn: AggregateFn
  ) {}
  toPrimitives() {
    return {
      aggregateId: this.aggregateId,
      aggregateFn: this.aggregateFn as string,
      category: this.category as string
    };
  }
  static fromPrimitives(values: { aggregateId: string; category: string; aggregateFn: string }) {
    const aggregateId = Aggregate.verifyAggregateId(values.aggregateId);
    const category = categoryFromPrimitive(values.category);
    const aggregateFn = Aggregate.verifyAggregateFn(values.aggregateFn);
    return new Aggregate(aggregateId, category, aggregateFn);
  }

  protected static verifyAggregateId(aggregateId: string): string {
    if (!aggregateId)
      throw InvalidInputException.fromStatusParams(AGGREGATE_EXCEPTIONS.InvalidAggregateId);
    return aggregateId;
  }

  protected static verifyAggregateFn(aggregateFn: string): AggregateFn {
    if (!isAggregateFn(aggregateFn))
      throw InvalidInputException.fromStatusParams(AGGREGATE_EXCEPTIONS.InvalidAggregateFn);
    return aggregateFn;
  }
}
