import { ContainerModule } from 'inversify';
import { ContainerModuleCreator } from '@Components/Shared/infrastructure/container-module-creator';
import { AggregatesGetter } from '@Components/Metrics/application/get-aggregates/aggregates-getter';
import { GetAggregatesQueryHandler } from '@Components/Metrics/application/get-aggregates/get-aggregates.query-handler';
import sharedIdentifiers from '@Components/Shared/infrastructure/di-identifiers';
import { AggregatesRepository } from '@Components/Metrics/domain/aggregates.repository';
import diIdentifiers from './di-identifiers';
import { GetAggregatesController } from '@Components/Metrics/infrastructure/web/Controllers/get-aggregates.controller';
import { GetAggregateValueController } from '@Components/Metrics/infrastructure/web/Controllers/get-aggregate-value.controller';
import { AggregatesRoutes } from '@Components/Metrics/infrastructure/web/Routes/aggregates.routes';
import { AggregatesTypeormRepository } from '@Components/Metrics/infrastructure/data/typeorm/repositories/aggregates.typeorm.repository';
import { AggregateValueGetter } from '@Components/Metrics/application/get-aggregate-value/aggregate-value-getter';
import { GetAggregateValueQueryHandler } from '@Components/Metrics/application/get-aggregate-value/get-aggregate-value.query-handler';
import { AggregateValuesRepository } from '@Components/Metrics/domain/aggregate-values.repository';

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
      options
        .bind(AggregateValueGetter)
        .toResolvedValue(
          (repo: AggregateValuesRepository) => new AggregateValueGetter(repo),
          [repoSymbol]
        );
      options
        .bind(GetAggregateValueQueryHandler)
        .toResolvedValue(
          (getter: AggregateValueGetter) => new GetAggregateValueQueryHandler(getter),
          [AggregatesGetter]
        );
      options
        .bind(sharedIdentifiers.QUERY_HANDLER)
        .toResolvedValue(
          (handler: GetAggregateValueQueryHandler) => handler,
          [GetAggregateValueQueryHandler]
        );
      options.bind(GetAggregatesController).toSelf();
      options.bind(GetAggregateValueController).toSelf();
      options.bind(AggregatesRoutes).toSelf();
    });
  }
} satisfies ContainerModuleCreator;
