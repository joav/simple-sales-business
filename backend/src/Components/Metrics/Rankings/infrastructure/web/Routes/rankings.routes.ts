import { AbstractRoutes } from '@Shared/infrastructure';
import { inject, injectable } from 'inversify';
import { GetRankingsController } from '../Controllers';

@injectable('Singleton')
export class RankingsRoutes extends AbstractRoutes {
  constructor(
    @inject(GetRankingsController)
    private readonly getRankingsController: GetRankingsController
  ) {
    super();
    this.setRoutes();
  }

  protected setRoutes() {
    this.router.get('', this.getRankingsController.handleRequest);
  }
}
