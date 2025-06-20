import { DataSourceConfig } from "@Components/Shared/infrastructure/data/typeorm/data-source.config";
import { DataSource } from "typeorm";

export const configFactory = (...entities: Function[]) => ({
  create() {
    return new DataSource({
      type: 'postgres',
      url: process.env.DATABASE_URL || 'postgresql://postgres:postgres@localhost:3501/postgres',
      entities,
      migrations: ['dist/src/data/typeorm/migrations/*.js'],
      migrationsRun: true,
      synchronize: false,
      logging: false
    });
  },
  async init() {
    const AppDataSource = this.create();

    await AppDataSource.initialize();

    return AppDataSource;
  }
} satisfies DataSourceConfig);
