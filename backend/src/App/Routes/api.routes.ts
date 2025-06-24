import diIdentifiers from '@App/Config/di-identifiers';
import { AbstractRoutes, ComponentRoute } from '@Shared/infrastructure';
import { injectable, multiInject } from 'inversify';

@injectable('Singleton')
export class ApiRoutes extends AbstractRoutes {
  @multiInject(diIdentifiers.COMPONENT_ROUTES)
  private readonly componentsRoutes!: ComponentRoute[];

  constructor() {
    super();
  }

  setRoutes() {
    this.router.get('', (_, res) => {
      res.redirect('/api-docs');
    });
    this.componentsRoutes.forEach((componentRoutes) => {
      this.router.use(componentRoutes.path, componentRoutes.getRouter());
    });
  }
}
