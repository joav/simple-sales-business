import { Container } from 'inversify';
import { ConfigExecutor } from '@Components/Shared/infrastructure/config-executor';
import appDiIdentifiers from '@App/Config/di-identifiers';
import { MetricsRoutes } from '../web';
import aggregatesContainerModuleCreator from '@Components/Metrics/infrastructure/config/aggregates.container-module-creator';

export const metricsConfigExecutor = {
  config(container: Container) {
    container.bind(appDiIdentifiers.COMPONENT_ROUTES).to(MetricsRoutes);
    container.loadSync(aggregatesContainerModuleCreator.create());
  }
} satisfies ConfigExecutor;
