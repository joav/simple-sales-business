import { ColumnOptions } from 'typeorm';

export const categoryColumnOptions: ColumnOptions = {
  primary: true,
  type: 'enum',
  enumName: 'metrics_category_enum'
};
