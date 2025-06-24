import { StatusController } from '@App/Controllers/status.controller';
import { AbstractRoutes } from '@Shared/infrastructure';
import { inject, injectable } from 'inversify';

@injectable('Singleton')
export class StatusRoutes extends AbstractRoutes {
  constructor(@inject(StatusController) private readonly statusController: StatusController) {
    super();
    this.setRoutes();
  }

  private setRoutes() {
    this.router.get('', this.statusController.handleRequest);
  }
}
