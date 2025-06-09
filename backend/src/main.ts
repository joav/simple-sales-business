import path from "node:path";
import { Container } from "inversify";
import { App } from "./App";

const webPort = +(process.env.PORT || 3500);
const openapiPath = path.resolve(__dirname, '../openapi.json');
const container: Container = new Container();

App.config(container);

const app = new App({
  openapiPath,
  webPort
});

app.start();

process.on('SIGTERM', app.stop);
process.on('SIGINT', app.stop);
