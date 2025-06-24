import { AggregateFn } from './aggregate-fn';

export const isAggregateFn = (value?: string): value is AggregateFn =>
  value && Object.values(AggregateFn).includes(value as AggregateFn);
