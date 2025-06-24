import { metricsConfigExecutor } from '@Metrics/Shared/infrastructure';
import config from '@Components/Shared/infrastructure/config';
import { ConfigExecutor } from '@Components/Shared/infrastructure/config-executor';
import { Container } from 'inversify';
export default {
  config(container: Container) {
    config.config(container);
    metricsConfigExecutor.config(container);
  }
} satisfies ConfigExecutor;
