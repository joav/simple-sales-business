import { Aggregate } from './aggregate';
import { strToDateOrError } from './str-to-date-or-error';
import { InvalidInputException } from '@Components/Shared/domain/exceptions/invalid-input.exception';
import { Category, categoryFromPrimitive } from '@Metrics/Shared/domain';
import { AggregateFn } from './aggregate-fn';

export const AGGREGATE_VALUE_EXCEPTIONS = {
  InvalidAggregateValue: {
    statusCode: 1003,
    statusMessage: 'Metrics:Domain:AggregateValue:InvalidAggregateValue'
  },
  InvalidLastUpdate: {
    statusCode: 1004,
    statusMessage: 'Metrics:Domain:AggregateValue:InvalidLastUpdate'
  }
};

export class AggregateValue extends Aggregate {
  private constructor(
    public readonly aggregateId: string,
    public readonly category: Category,
    public readonly aggregateFn: AggregateFn,
    public readonly aggregateValue: number,
    public readonly lastUpdate: Date
  ) {
    super(aggregateId, category, aggregateFn);
  }
  toPrimitives() {
    return {
      aggregateId: this.aggregateId,
      aggregateFn: this.aggregateFn as string,
      category: this.category as string,
      aggregateValue: this.aggregateValue,
      lastUpdate: this.lastUpdate.toISOString()
    };
  }
  static fromPrimitives(values: {
    aggregateId: string;
    category: string;
    aggregateFn: string;
    aggregateValue: number;
    lastUpdate: string;
  }) {
    const aggregateId = Aggregate.verifyAggregateId(values.aggregateId);
    const category = categoryFromPrimitive(values.category);
    const aggregateFn = Aggregate.verifyAggregateFn(values.aggregateFn);
    const aggregateValue = AggregateValue.verifyAggregateValue(values.aggregateValue);
    const lastUpdate = strToDateOrError(values.lastUpdate, AggregateValue.lastUpdateErrorFactory);
    return new AggregateValue(aggregateId, category, aggregateFn, aggregateValue, lastUpdate);
  }

  private static verifyAggregateValue(aggregateValue: number) {
    if (isNaN(aggregateValue))
      throw InvalidInputException.fromStatusParams(
        AGGREGATE_VALUE_EXCEPTIONS.InvalidAggregateValue
      );
    return +aggregateValue;
  }

  private static lastUpdateErrorFactory() {
    return InvalidInputException.fromStatusParams(AGGREGATE_VALUE_EXCEPTIONS.InvalidLastUpdate);
  }
}
