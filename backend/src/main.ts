import path from 'node:path';
import { Container } from 'inversify';
import { App } from './App';
import appConfig from '@App/Config/app.config';

const webPort = +(process.env.PORT || 3500);
const openapiPath = path.resolve(__dirname, '../openapi.json');
const container: Container = new Container();

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
