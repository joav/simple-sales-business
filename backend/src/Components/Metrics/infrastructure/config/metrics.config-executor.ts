import { Container } from 'inversify';
import { ConfigExecutor } from '@Components/Shared/infrastructure/config-executor';
import AggregatesContainerModuleCreator from './aggregates.container-module-creator';

export default {
  config(container: Container) {
    container.loadSync(AggregatesContainerModuleCreator.create());
  }
} satisfies ConfigExecutor;
