import { AggregatesRoutes } from '@Metrics/Aggregates/infrastructure';
import { TimeSeriesRoutes } from '@Metrics/TimeSeries/infrastructure';
import { AbstractRoutes, ComponentRoute } from '@Shared/infrastructure';
import { inject, injectable } from 'inversify';

@injectable('Singleton')
export class MetricsRoutes extends AbstractRoutes implements ComponentRoute {
  path = '/metrics';

  constructor(
    @inject(AggregatesRoutes) private readonly aggregatesRoutes: AggregatesRoutes,
    @inject(TimeSeriesRoutes) private readonly timeSeriesRoutes: TimeSeriesRoutes
  ) {
    super();
    this.setRoutes();
  }

  setRoutes() {
    this.router.use('/:category/aggregates', this.aggregatesRoutes.getRouter());
    this.router.use('/:category/series', this.timeSeriesRoutes.getRouter());
  }
}
