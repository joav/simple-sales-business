import { AbstractRoutes } from './AbstractRoutes';

export interface ComponentRoute extends AbstractRoutes {
  readonly path: string;
}
