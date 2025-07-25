import { Response } from '@Shared/domain';
import { Aggregate } from '@Metrics/Aggregates/domain';

type AggregateResponse = {
  aggregateId: string;
  aggregateFn: string;
  category: string;
};

export class GetAggregatesResponse implements Response {
  readonly aggregates: AggregateResponse[];
  constructor(aggregates: Aggregate[]) {
    this.aggregates = aggregates.map((a) => a.toPrimitives());
  }
}
