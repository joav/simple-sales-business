import { DataSource } from 'typeorm';

export interface DataSourceConfig {
  create: () => DataSource;
  init: () => Promise<DataSource>;
}

export default {
  create() {
    return new DataSource({
      type: 'postgres',
      url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:3501/postgres',
      entities: [
        __dirname + '/../../../../**/infrastructure/data/typeorm/entities/*.entity{.js,.ts}'
      ],
      migrations: ['dist/src/data/typeorm/migrations/*.js'],
      migrationsRun: true,
      synchronize: false,
      logging: process.env.NODE_ENV === 'development' || process.env.DATABASE_QUERY_LOGGING === '1'
    });
  },
  async init() {
    const AppDataSource = this.create();

    await AppDataSource.initialize();

    return AppDataSource;
  }
} satisfies DataSourceConfig;
