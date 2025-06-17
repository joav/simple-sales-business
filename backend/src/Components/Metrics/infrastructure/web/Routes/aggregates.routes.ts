import { AbstractRoutes } from '@Components/Shared/infrastructure/web/AbstractRoutes';
import { inject, injectable } from 'inversify';
import { GetAggregatesController } from '../Controllers/get-aggregates.controller';

@injectable('Singleton')
export class AggregatesRoutes extends AbstractRoutes {
  constructor(
    @inject(GetAggregatesController)
    private readonly getAggregatesController: GetAggregatesController
  ) {
    super();
    this.setRoutes();
  }

  protected setRoutes() {
    this.router.get('', this.getAggregatesController.handleRequest);
  }
}
