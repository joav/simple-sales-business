import { ConfigExecutor, sharedConfig } from '@Shared/infrastructure';
import { metricsConfigExecutor } from '@Metrics/Shared/infrastructure';
import { Container } from 'inversify';
export default {
  config(container: Container) {
    sharedConfig.config(container);
    metricsConfigExecutor.config(container);
  }
} satisfies ConfigExecutor;
