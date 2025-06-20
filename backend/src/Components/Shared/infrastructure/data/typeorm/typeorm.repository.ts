import { inject, injectable } from 'inversify';
import { DataSourceWrapper } from './data-source-wrapper';
import { EntityTarget } from 'typeorm';

@injectable()
export abstract class TypeormRepository<Entity> {
  constructor(@inject(DataSourceWrapper) private datasSourceWrapper: DataSourceWrapper) {}

  protected abstract entity: EntityTarget<Entity>;

  protected get dataSource() {
    return this.datasSourceWrapper.dataSource;
  }

  protected get repository() {
    return this.datasSourceWrapper.dataSource.then((ds) => ds.getRepository(this.entity));
  }
}
