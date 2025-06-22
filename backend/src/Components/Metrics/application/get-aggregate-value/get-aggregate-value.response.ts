import { Response } from '@Components/Shared/domain/response';
import { AggregateValue } from '@Components/Metrics/domain/aggregate-value';

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