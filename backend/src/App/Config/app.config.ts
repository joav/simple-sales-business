import { HomeController } from '@App/Controllers/home.controller';
import { HomeRoutes } from '@App/Routes/home.routes';
import { Container } from 'inversify';
import diIdentifiers from './di-identifiers';
import { App } from '@App/app';
import { AppRoutes } from '@App/Routes/app.routes';
import swaggerConfig from '@App/Swagger/swagger.config';

export default {
  config(container: Container, appParams: Partial<AppParams>) {
    container.bind(HomeController).toSelf();
    container.bind(HomeRoutes).toSelf();
    container.bind(AppRoutes).toSelf();
    container.bind<Partial<AppParams>>(diIdentifiers.APP_PARAMS).toConstantValue(appParams);
    container.bind<SwaggerConfig>(diIdentifiers.SWAGGER_CONFIG).toConstantValue(swaggerConfig);
    container.bind(App).toSelf();
  }
};
