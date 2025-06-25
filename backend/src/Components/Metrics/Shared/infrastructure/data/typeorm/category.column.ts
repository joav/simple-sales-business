import { Column, ColumnOptions } from 'typeorm';

export const CategoryColumn = (opts?: ColumnOptions) => Column({ ...opts, type: 'enum', enumName: 'metrics_category_enum' });
