import { ContainerModule } from 'inversify';
import { ContainerModuleCreator } from '@Components/Shared/infrastructure/container-module-creator';
import { AggregatesGetter } from '@Components/Metrics/application/get-aggregates/aggregates-getter';
import { GetAggregatesQueryHandler } from '@Components/Metrics/application/get-aggregates/get-aggregates.query-handler';
import sharedIdentifiers from '@Components/Shared/infrastructure/di-identifiers';
import { AggregatesRepository } from '@Components/Metrics/domain/aggregates.repository';
import diIdentifiers from './di-identifiers';
import { GetAggregatesController } from '@Components/Metrics/infrastructure/web/Controllers/get-aggregates.controller';
import { AggregatesRoutes } from '@Components/Metrics/infrastructure/web/Routes/aggregates.routes';
import { AggregatesTypeormRepository } from "@Components/Metrics/infrastructure/data/typeorm/repositories/aggregates.typeorm.repository";

export default {
  create() {
    return new ContainerModule((options) => {
      const repoSymbol = diIdentifiers.AGGREGATES_REPOSITORY;
      options.bind(repoSymbol).to(AggregatesTypeormRepository);
      options
        .bind(AggregatesGetter)
        .toResolvedValue((repo: AggregatesRepository) => new AggregatesGetter(repo), [repoSymbol]);
      options
        .bind(GetAggregatesQueryHandler)
        .toResolvedValue(
          (getter: AggregatesGetter) => new GetAggregatesQueryHandler(getter),
          [AggregatesGetter]
        );
      options
        .bind(sharedIdentifiers.QUERY_HANDLER)
        .toResolvedValue(
          (handler: GetAggregatesQueryHandler) => handler,
          [GetAggregatesQueryHandler]
        );
      options.bind(GetAggregatesController).toSelf();
      options.bind(AggregatesRoutes).toSelf();
    });
  }
} satisfies ContainerModuleCreator;
