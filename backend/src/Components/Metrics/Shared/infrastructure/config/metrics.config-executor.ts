import { Container } from 'inversify';
import { ConfigExecutor } from '@Shared/infrastructure';
import appDiIdentifiers from '@App/Config/di-identifiers';
import { MetricsRoutes } from '../web';
import { aggregatesContainerModuleCreator } from '@Metrics/Aggregates/infrastructure';
import { timeSeriesContainerModuleCreator } from '@Metrics/TimeSeries/infrastructure';

export const metricsConfigExecutor = {
  config(container: Container) {
    container.bind(appDiIdentifiers.COMPONENT_ROUTES).to(MetricsRoutes);
    container.loadSync(aggregatesContainerModuleCreator.create());
    container.loadSync(timeSeriesContainerModuleCreator.create());
  }
} satisfies ConfigExecutor;
