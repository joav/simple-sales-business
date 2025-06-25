import { AbstractRoutes } from '@Shared/infrastructure';
import { inject, injectable } from 'inversify';
import { GetTimeSeriesController } from '../Controllers/get-time-series.controller';
import { GetTimeSerieController } from '../Controllers';

@injectable('Singleton')
export class TimeSeriesRoutes extends AbstractRoutes {
  constructor(
    @inject(GetTimeSeriesController)
    private readonly getTimeSeriesController: GetTimeSeriesController,
    @inject(GetTimeSerieController)
    private readonly getTimeSerieController: GetTimeSerieController
  ) {
    super();
    this.setRoutes();
  }

  protected setRoutes() {
    this.router.get('', this.getTimeSeriesController.handleRequest);
    this.router.get('/:timeSerieSlug', this.getTimeSerieController.handleRequest);
  }
}
