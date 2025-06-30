import { metricsSharedDiIdentifiers } from '@Metrics/Shared/infrastructure';
import { GetRankingsQueryHandler, RankingsGetter } from '@Metrics/Rankings/application';
import { RankingsRepository } from '@Metrics/Rankings/domain';
import { ContainerModuleCreator, sharedDiIdentifiers } from '@Shared/infrastructure';
import { ContainerModule } from 'inversify';
import { GetRankingsController, RankingsRoutes } from '../web';

export const rankingsContainerModuleCreator = {
  create() {
    return new ContainerModule((options) => {
      const repoSymbol = metricsSharedDiIdentifiers.RANKINGS_REPOSITORY;
      options.bind(repoSymbol).toConstantValue({ listRankings: () => Promise.resolve([]) });
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

      options.bind(GetRankingsController).toSelf();
      options.bind(RankingsRoutes).toSelf();
    });
  }
} satisfies ContainerModuleCreator;
