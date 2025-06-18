import path from 'node:path';
import { Container } from 'inversify';
import { App } from './App';
import appConfig from '@App/Config/app.config';
import componentsConfigExecutor from './components.config-executor';

const webPort = +(process.env.PORT || 3500);
const openapiPath = path.resolve(__dirname, '../openapi.json');
const container: Container = new Container();

componentsConfigExecutor.config(container);

appConfig.config(container, {
  openapiPath,
  webPort,
  closeTimeout: 5000,
  process
});

const app = container.get(App);

app.start();

process.on('SIGTERM', app.stop);
process.on('SIGINT', app.stop);
