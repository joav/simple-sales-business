import { AbstractRoutes } from '@Components/Shared/infrastructure/web/AbstractRoutes';
import { ComponentRoute } from '@Components/Shared/infrastructure/web/ComponentRoutes';
import { inject, injectable } from 'inversify';
import { AggregatesRoutes } from './aggregates.routes';

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
