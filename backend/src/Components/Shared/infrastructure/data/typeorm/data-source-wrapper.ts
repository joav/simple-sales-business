import { inject, injectable } from 'inversify';
import diIdentifiers from '../../di-identifiers';
import { DataSourceConfig, SharedDataSource } from './data-source.config';
import { DataSource } from 'typeorm';

@injectable('Singleton')
export class DataSourceWrapper {
  private _dataSource: DataSource | null = null;
  constructor(@inject(diIdentifiers.DATA_SOURCE_CONFIG) private config: DataSourceConfig) {}

  get dataSource(): SharedDataSource {
    if (this._dataSource) return Promise.resolve(this._dataSource);
    return this.initDataSource();
  }

  private async initDataSource() {
    this._dataSource = await this.config.init();
    return this._dataSource;
  }
}
