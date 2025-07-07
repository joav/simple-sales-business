import { metricsSharedDiIdentifiers } from '@Metrics/Shared/infrastructure';
import {
  GetRankingQueryHandler,
  GetRankingsQueryHandler,
  RankingGetter,
  RankingsGetter
} from '@Metrics/Rankings/application';
import { RankingsRepository } from '@Metrics/Rankings/domain';
import { ContainerModuleCreator, sharedDiIdentifiers } from '@Shared/infrastructure';
import { ContainerModule } from 'inversify';
import { RankingsTypeormRepository } from '../data';
import { GetRankingsController, RankingsRoutes } from '../web';

export const rankingsContainerModuleCreator = {
  create() {
    return new ContainerModule((options) => {
      const repoSymbol = metricsSharedDiIdentifiers.RANKINGS_REPOSITORY;
      options.bind(repoSymbol).to(RankingsTypeormRepository);
      options
        .bind(RankingsGetter)
        .toResolvedValue((repo: RankingsRepository) => new RankingsGetter(repo), [repoSymbol]);
      options
        .bind(GetRankingsQueryHandler)
        .toResolvedValue(
          (getter: RankingsGetter) => new GetRankingsQueryHandler(getter),
          [RankingsGetter]
        );
      options
        .bind(sharedDiIdentifiers.QUERY_HANDLER)
        .toResolvedValue((handler: GetRankingsQueryHandler) => handler, [GetRankingsQueryHandler]);
      options
        .bind(RankingGetter)
        .toResolvedValue((repo: RankingsRepository) => new RankingGetter(repo), [repoSymbol]);
      options
        .bind(GetRankingQueryHandler)
        .toResolvedValue(
          (getter: RankingGetter) => new GetRankingQueryHandler(getter),
          [RankingGetter]
        );
      options
        .bind(sharedDiIdentifiers.QUERY_HANDLER)
        .toResolvedValue((handler: GetRankingQueryHandler) => handler, [GetRankingQueryHandler]);

      options.bind(GetRankingsController).toSelf();
      options.bind(RankingsRoutes).toSelf();
    });
  }
} satisfies ContainerModuleCreator;
