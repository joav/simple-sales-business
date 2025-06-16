import { ContainerModule } from 'inversify';

export interface ContainerModuleCreator {
  create(): ContainerModule;
}
