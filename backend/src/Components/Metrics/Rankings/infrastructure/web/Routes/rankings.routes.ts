import { AbstractRoutes } from '@Shared/infrastructure';
import { inject, injectable } from 'inversify';
import { GetRankingController, GetRankingsController } from '../Controllers';

@injectable('Singleton')
export class RankingsRoutes extends AbstractRoutes {
  constructor(
    @inject(GetRankingsController)
    private readonly getRankingsController: GetRankingsController,
    @inject(GetRankingController)
    private readonly getRankingController: GetRankingController
  ) {
    super();
    this.setRoutes();
  }

  protected setRoutes() {
    this.router.get('', this.getRankingsController.handleRequest);
    this.router.get('/:rankingSlug', this.getRankingController.handleRequest);
  }
}
