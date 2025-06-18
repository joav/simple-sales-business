import metricsConfigExecutor from '@Components/Metrics/infrastructure/config/metrics.config-executor';
import config from '@Components/Shared/infrastructure/config';
import { ConfigExecutor } from '@Components/Shared/infrastructure/config-executor';
import { Container } from 'inversify';
export default {
  config(container: Container) {
    config.config(container);
    metricsConfigExecutor.config(container);
  }
} satisfies ConfigExecutor;
