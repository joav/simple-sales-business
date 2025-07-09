import { metricsSharedDiIdentifiers } from '@Metrics/Shared/infrastructure';
import {
  GetRankingQueryHandler,
  GetRankingsQueryHandler,
  RankingGetter,
  RankingsGetter
} from '@Metrics/Rankings/application';
import { RankingsRepository } from '@Metrics/Rankings/domain';
import { ContainerModuleCreator, sharedDiIdentifiers, getLogger } from '@Shared/infrastructure';
import { ContainerModule } from 'inversify';
import { RankingsTypeormRepository } from '../data';
import { GetRankingController, GetRankingsController, RankingsRoutes } from '../web';
import { LOGGER, configLogger } from '../logger';
import { ApplicationLogger } from '@Shared/domain';

export const rankingsContainerModuleCreator = {
  create() {
    return new ContainerModule((options) => {
      configLogger();
      const logger = getLogger(LOGGER);
      options.bind(sharedDiIdentifiers.LOGGER).toConstantValue(logger).whenNamed(LOGGER);
      const repoSymbol = metricsSharedDiIdentifiers.RANKINGS_REPOSITORY;
      options.bind(repoSymbol).to(RankingsTypeormRepository);
      options
        .bind(RankingsGetter)
        .toResolvedValue((repo: RankingsRepository) => new RankingsGetter(repo), [repoSymbol]);
      options
        .bind(GetRankingsQueryHandler)
        .toResolvedValue(
          (getter: RankingsGetter, logger: ApplicationLogger) =>
            new GetRankingsQueryHandler(getter, logger),
          [RankingsGetter, { name: LOGGER, serviceIdentifier: sharedDiIdentifiers.LOGGER }]
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
          (getter: RankingGetter, logger: ApplicationLogger) =>
            new GetRankingQueryHandler(getter, logger),
          [RankingGetter, { name: LOGGER, serviceIdentifier: sharedDiIdentifiers.LOGGER }]
        );
      options
        .bind(sharedDiIdentifiers.QUERY_HANDLER)
        .toResolvedValue((handler: GetRankingQueryHandler) => handler, [GetRankingQueryHandler]);

      options.bind(GetRankingsController).toSelf();
      options.bind(GetRankingController).toSelf();
      options.bind(RankingsRoutes).toSelf();
    });
  }
} satisfies ContainerModuleCreator;
