import { ContainerModule } from 'inversify';
import {
  AggregatesGetter,
  GetAggregatesQueryHandler,
  AggregateValueGetter,
  GetAggregateValueQueryHandler
} from '@Metrics/Aggregates/application';
import { AggregatesRepository, AggregateValuesRepository } from '@Metrics/Aggregates/domain';
import { metricsSharedDiIdentifiers } from '@Metrics/Shared/infrastructure';
import { AggregatesTypeormRepository } from '../data';
import { GetAggregatesController, GetAggregateValueController, AggregatesRoutes } from '../web';
import { ContainerModuleCreator, sharedDiIdentifiers } from '@Shared/infrastructure';

export const aggregatesContainerModuleCreator = {
  create() {
    return new ContainerModule((options) => {
      const repoSymbol = metricsSharedDiIdentifiers.AGGREGATES_REPOSITORY;
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
        .bind(sharedDiIdentifiers.QUERY_HANDLER)
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
        .bind(sharedDiIdentifiers.QUERY_HANDLER)
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
