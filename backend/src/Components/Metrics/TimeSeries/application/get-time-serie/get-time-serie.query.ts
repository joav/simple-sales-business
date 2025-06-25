import { Query } from '@Shared/domain';
import { GetTimeSerieResponse } from './get-time-serie.response';

export class GetTimeSerieQuery implements Query<GetTimeSerieResponse> {
  constructor(
    public readonly category: string,
    public readonly timeSerieSlug: string
  ) {}
}
