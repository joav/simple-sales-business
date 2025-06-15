import { Response } from '@Components/Shared/domain/response';
import { Aggregate } from '@Components/Metrics/domain/aggregate';

export class GetAggregatesResponse implements Response {
  readonly aggregates: AggregateResponse[];
  constructor(aggregates: Aggregate[]) {
    this.aggregates = aggregates.map(a => a.toPrimitives());
  }
}

