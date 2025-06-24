import { Query } from '@Shared/domain';
import { GetTimeSeriesResponse } from './get-time-series.response';

export class GetTimeSeriesQuery implements Query<GetTimeSeriesResponse> {
  constructor(public readonly category: string) {}
}
