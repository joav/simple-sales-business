import { Response } from '@Shared/domain';
import { AggregateValue } from '@Metrics/Aggregates/domain';

type AggregateValueResponse = {
  aggregateId: string;
  aggregateFn: string;
  category: string;
  aggregateValue: number;
  lastUpdate: string;
};

export class GetAggregateValueResponse implements Response {
  readonly aggregateValue: AggregateValueResponse;
  constructor(aggregateValue: AggregateValue) {
    this.aggregateValue = aggregateValue.toPrimitives();
  }
}
