import { AggregatesRoutes } from '@Components/Metrics/infrastructure/web/Routes/aggregates.routes';
import { AbstractRoutes } from '@Components/Shared/infrastructure/web/AbstractRoutes';
import { ComponentRoute } from '@Components/Shared/infrastructure/web/ComponentRoutes';
import { inject, injectable } from 'inversify';

@injectable('Singleton')
export class MetricsRoutes extends AbstractRoutes implements ComponentRoute {
  path = '/metrics';

  constructor(@inject(AggregatesRoutes) private readonly aggregatesRoutes: AggregatesRoutes) {
    super();
    this.setRoutes();
  }

  setRoutes() {
    this.router.use('/:category/aggregates', this.aggregatesRoutes.getRouter());
  }
}
