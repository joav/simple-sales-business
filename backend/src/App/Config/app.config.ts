import { HomeController } from '@App/Controllers/home.controller';
import { HomeRoutes } from '@App/Routes/home.routes';
import { Container } from 'inversify';
import diIdentifiers from './di-identifiers';
import { App } from '@App/app';
import { AppRoutes } from '@App/Routes/app.routes';
import swaggerConfig from '@App/Swagger/swagger.config';
import { StatusController } from '@App/Controllers/status.controller';
import { StatusRoutes } from '@App/Routes/status.routes';
import { ApiRoutes } from '@App/Routes/api.routes';
import '../logger';
import { appLoggers } from '../loggers';
import { sharedDiIdentifiers, getLogger } from '@Shared/infrastructure';
import { morganConfigMiddleWare } from '../Morgan/config-middleware';
import { corsConfig } from '../Cors/cors.config';

export default {
  config(container: Container, appParams: Partial<AppParams>) {
    container
      .bind(sharedDiIdentifiers.LOGGER)
      .toConstantValue(getLogger(appLoggers.HTTP))
      .whenNamed(appLoggers.HTTP);
    container.bind(diIdentifiers.MORGAN_CONFIG).toConstantValue(morganConfigMiddleWare);
    container.bind(HomeController).toSelf();
    container.bind(StatusController).toSelf();
    container.bind(HomeRoutes).toSelf();
    container.bind(StatusRoutes).toSelf();
    container.bind(ApiRoutes).toSelf();
    container.bind(AppRoutes).toSelf();
    container.bind<Partial<AppParams>>(diIdentifiers.APP_PARAMS).toConstantValue(appParams);
    container.bind<SwaggerConfig>(diIdentifiers.SWAGGER_CONFIG).toConstantValue(swaggerConfig);
    container.bind<CorsConfig>(diIdentifiers.CORS_CONFIG).toConstantValue(corsConfig);
    container.bind(App).toSelf();
  }
};
