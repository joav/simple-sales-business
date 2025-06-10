import { HomeController } from '@App/Controllers/home.controller';
import { HomeRoutes } from '@App/Routes/home.routes';
import { Container } from 'inversify';
import diIdentifiers from './di-identifiers';
import { App } from '@App/app';
import { AppRoutes } from '@App/Routes/app.routes';

export default {
  config(container: Container, appParams: Partial<AppParams>) {
    container.bind(HomeController).toSelf();
    container.bind(HomeRoutes).toSelf();
    container.bind(AppRoutes).toSelf();
    container.bind<Partial<AppParams>>(diIdentifiers.APP_PARAMS).toConstantValue(appParams);
    container.bind(App).toSelf();
  }
};
