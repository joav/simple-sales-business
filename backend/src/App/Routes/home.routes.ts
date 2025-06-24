import { AbstractRoutes } from '@Shared/infrastructure';
import { HomeController } from '../Controllers/home.controller';
import { inject, injectable } from 'inversify';

@injectable('Singleton')
export class HomeRoutes extends AbstractRoutes {
  constructor(@inject(HomeController) private readonly homeController: HomeController) {
    super();
    this.setRoutes();
  }

  protected setRoutes() {
    this.router.get('', this.homeController.handleRequest);
  }
}
