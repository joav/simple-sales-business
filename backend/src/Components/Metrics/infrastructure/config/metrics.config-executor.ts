import { Container } from 'inversify';
import { ConfigExecutor } from '@Components/Shared/infrastructure/config-executor';
import AggregatesContainerModuleCreator from './aggregates.container-module-creator';
import appDiIdentifiers from '@App/Config/di-identifiers';
import { MetricsRoutes } from '../web/Routes/metrics.routes';

export default {
  config(container: Container) {
    container.bind(appDiIdentifiers.COMPONENT_ROUTES).to(MetricsRoutes);
    container.loadSync(AggregatesContainerModuleCreator.create());
  }
} satisfies ConfigExecutor;
