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
import { ContainerModuleCreator, sharedDiIdentifiers, getLogger } from '@Shared/infrastructure';
import { LOGGER, configLogger } from '../logger';
import { ApplicationLogger } from '@Shared/domain';

export const aggregatesContainerModuleCreator = {
  create() {
    return new ContainerModule((options) => {
      configLogger();
      options.bind(sharedDiIdentifiers.LOGGER).toConstantValue(getLogger(LOGGER)).whenNamed(LOGGER);
      const repoSymbol = metricsSharedDiIdentifiers.AGGREGATES_REPOSITORY;
      options.bind(repoSymbol).to(AggregatesTypeormRepository);
      options
        .bind(AggregatesGetter)
        .toResolvedValue((repo: AggregatesRepository) => new AggregatesGetter(repo), [repoSymbol]);
      options
        .bind(GetAggregatesQueryHandler)
        .toResolvedValue(
          (getter: AggregatesGetter, logger: ApplicationLogger) =>
            new GetAggregatesQueryHandler(getter, logger),
          [AggregatesGetter, { name: LOGGER, serviceIdentifier: sharedDiIdentifiers.LOGGER }]
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
          (getter: AggregateValueGetter, logger: ApplicationLogger) =>
            new GetAggregateValueQueryHandler(getter, logger),
          [AggregateValueGetter, { name: LOGGER, serviceIdentifier: sharedDiIdentifiers.LOGGER }]
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
