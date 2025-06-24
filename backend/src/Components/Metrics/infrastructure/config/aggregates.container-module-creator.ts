import { ContainerModule } from 'inversify';
import { ContainerModuleCreator } from '@Components/Shared/infrastructure/container-module-creator';
import {
  AggregatesGetter,
  GetAggregatesQueryHandler,
  AggregateValueGetter,
  GetAggregateValueQueryHandler
} from '@Metrics/Aggregates/application';
import sharedIdentifiers from '@Components/Shared/infrastructure/di-identifiers';
import { AggregatesRepository, AggregateValuesRepository } from '@Metrics/Aggregates/domain';
import diIdentifiers from './di-identifiers';
import { GetAggregatesController } from '@Components/Metrics/infrastructure/web/Controllers/get-aggregates.controller';
import { GetAggregateValueController } from '@Components/Metrics/infrastructure/web/Controllers/get-aggregate-value.controller';
import { AggregatesRoutes } from '@Components/Metrics/infrastructure/web/Routes/aggregates.routes';
import { AggregatesTypeormRepository } from '@Components/Metrics/infrastructure/data/typeorm/repositories/aggregates.typeorm.repository';

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
          [AggregateValueGetter]
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
