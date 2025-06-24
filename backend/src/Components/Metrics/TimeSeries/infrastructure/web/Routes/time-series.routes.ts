import { AbstractRoutes } from '@Shared/infrastructure';
import { inject, injectable } from 'inversify';
import { GetTimeSeriesController } from '../Controllers/get-time-series.controller';

@injectable('Singleton')
export class TimeSeriesRoutes extends AbstractRoutes {
  constructor(
    @inject(GetTimeSeriesController)
    private readonly getTimeSeriesController: GetTimeSeriesController
  ) {
    super();
    this.setRoutes();
  }

  protected setRoutes() {
    this.router.get('', this.getTimeSeriesController.handleRequest);
  }
}
