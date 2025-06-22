import { AbstractRoutes } from '@Components/Shared/infrastructure/web/AbstractRoutes';
import { inject, injectable } from 'inversify';
import { GetAggregatesController } from '../Controllers/get-aggregates.controller';
import { GetAggregateValueController } from '../Controllers/get-aggregate-value.controller';

@injectable('Singleton')
export class AggregatesRoutes extends AbstractRoutes {
  constructor(
    @inject(GetAggregatesController)
    private readonly getAggregatesController: GetAggregatesController,
    @inject(GetAggregateValueController)
    private readonly getAggregateValueController: GetAggregateValueController
  ) {
    super();
    this.setRoutes();
  }

  protected setRoutes() {
    this.router.get('', this.getAggregatesController.handleRequest);
    this.router.get('/:aggregateId', this.getAggregateValueController.handleRequest);
  }
}
