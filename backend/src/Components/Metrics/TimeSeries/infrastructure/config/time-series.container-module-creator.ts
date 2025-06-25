import { metricsSharedDiIdentifiers } from '@Metrics/Shared/infrastructure';
import {
  GetTimeSerieQueryHandler,
  GetTimeSeriesQueryHandler,
  TimeSerieGetter,
  TimeSeriesGetter
} from '@Metrics/TimeSeries/application';
import { TimeSeriesRepository } from '@Metrics/TimeSeries/domain';
import { ContainerModuleCreator, sharedDiIdentifiers } from '@Shared/infrastructure';
import { ContainerModule } from 'inversify';
import { TimeSeriesTypeormRepository } from '../data';
import { GetTimeSerieController, GetTimeSeriesController, TimeSeriesRoutes } from '../web';

export const timeSeriesContainerModuleCreator = {
  create() {
    return new ContainerModule((options) => {
      const repoSymbol = metricsSharedDiIdentifiers.TIME_SERIES_REPOSITORY;
      options.bind(repoSymbol).to(TimeSeriesTypeormRepository);
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
      options
        .bind(TimeSerieGetter)
        .toResolvedValue((repo: TimeSeriesRepository) => new TimeSerieGetter(repo), [repoSymbol]);
      options
        .bind(GetTimeSerieQueryHandler)
        .toResolvedValue(
          (getter: TimeSerieGetter) => new GetTimeSerieQueryHandler(getter),
          [TimeSerieGetter]
        );
      options
        .bind(sharedDiIdentifiers.QUERY_HANDLER)
        .toResolvedValue(
          (handler: GetTimeSerieQueryHandler) => handler,
          [GetTimeSerieQueryHandler]
        );

      options.bind(GetTimeSeriesController).toSelf();
      options.bind(GetTimeSerieController).toSelf();
      options.bind(TimeSeriesRoutes).toSelf();
    });
  }
} satisfies ContainerModuleCreator;
