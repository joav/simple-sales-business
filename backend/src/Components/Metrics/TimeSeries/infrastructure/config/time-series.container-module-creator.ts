import { metricsSharedDiIdentifiers } from '@Metrics/Shared/infrastructure';
import { GetTimeSeriesQueryHandler, TimeSeriesGetter } from '@Metrics/TimeSeries/application';
import { TimeSeriesRepository } from '@Metrics/TimeSeries/domain';
import { ContainerModuleCreator, sharedDiIdentifiers } from '@Shared/infrastructure';
import { ContainerModule } from 'inversify';
import { TimeSeriesInMemoryRepository } from '../data';
import { GetTimeSeriesController, TimeSeriesRoutes } from '../web';

export const timeSeriesContainerModuleCreator = {
  create() {
    return new ContainerModule((options) => {
      const repoSymbol = metricsSharedDiIdentifiers.TIME_SERIES_REPOSITORY;
      options.bind(repoSymbol).to(TimeSeriesInMemoryRepository);
      options
        .bind(TimeSeriesGetter)
        .toResolvedValue((repo: TimeSeriesRepository) => new TimeSeriesGetter(repo), [repoSymbol]);
      options
        .bind(GetTimeSeriesQueryHandler)
        .toResolvedValue(
          (getter: TimeSeriesGetter) => new GetTimeSeriesQueryHandler(getter),
          [TimeSeriesGetter]
        );
      options
        .bind(sharedDiIdentifiers.QUERY_HANDLER)
        .toResolvedValue(
          (handler: GetTimeSeriesQueryHandler) => handler,
          [GetTimeSeriesQueryHandler]
        );

      options.bind(GetTimeSeriesController).toSelf();
      options.bind(TimeSeriesRoutes).toSelf();
    });
  }
} satisfies ContainerModuleCreator;
